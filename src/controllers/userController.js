import User from "../models/User.js";
import Badge from "../models/Badge.js";

export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .select("-password")
      .populate("badges");
    if (!user) return res.status(404).json({ msg: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const updates = req.body;
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

export const updateStats = async (req, res) => {
  try {
    const { steps, distance } = req.body;
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ msg: "User not found" });
    if (steps) user.updateSteps(steps);
    if (distance) user.distance += distance;
    await user.save();
    res.json(user);
  } catch (err) {
    console.error("Stats update error:", err);
    res.status(500).json({ msg: "Server error" });
  }
};

export const addBadge = async (req, res) => {
  try {
    const { badgeId } = req.body;
    const user = await User.findById(req.user.id);
    const badge = await Badge.findById(badgeId);
    if (!user || !badge) return res.status(404).json({ msg: "User or Badge not found" });
    user.addBadge(badgeId);   
    await badge.award(user._id);
    await user.save();
    res.json({ msg: "Badge awarded", user });
  } catch (err) {
    console.error("Add badge error:", err);
    res.status(500).json({ msg: "Server error" });
  }
};
