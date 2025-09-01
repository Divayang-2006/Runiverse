import User from "../models/User.js";
import Badge from "../models/Badge.js";

/* ---------------- GET LOGGED-IN USER PROFILE ---------------- */
export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .select("-password")
      .populate("badges"); // populate earned badges
    if (!user) return res.status(404).json({ msg: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

/* ---------------- UPDATE PROFILE / FITNESS STATS ---------------- */
export const updateProfile = async (req, res) => {
  try {
    const updates = req.body;

    // Ensure location has correct GeoJSON format
    if (updates.location && updates.location.coordinates) {
      updates.location.type = "Point";
    } else {
      delete updates.location;
    }

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { $set: updates },
      { new: true, runValidators: true }
    ).select("-password");

    res.json(user);
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({ msg: "Server error" });
  }
};

/* ---------------- UPDATE FITNESS STATS (steps, distance) ---------------- */
export const updateStats = async (req, res) => {
  try {
    const { steps, distance } = req.body;
    const user = await User.findById(req.user.id);

    if (!user) return res.status(404).json({ msg: "User not found" });

    if (steps) user.updateSteps(steps); // OOP method
    if (distance) user.distance += distance;

    await user.save();
    res.json(user);
  } catch (err) {
    console.error("Stats update error:", err);
    res.status(500).json({ msg: "Server error" });
  }
};

/* ---------------- ADD BADGE TO USER ---------------- */
export const addBadge = async (req, res) => {
  try {
    const { badgeId } = req.body;
    const user = await User.findById(req.user.id);
    const badge = await Badge.findById(badgeId);

    if (!user || !badge) return res.status(404).json({ msg: "User or Badge not found" });

    user.addBadge(badgeId);      // OOP method on User
    await badge.award(user._id); // OOP method on Badge

    await user.save();
    res.json({ msg: "Badge awarded", user });
  } catch (err) {
    console.error("Add badge error:", err);
    res.status(500).json({ msg: "Server error" });
  }
};
