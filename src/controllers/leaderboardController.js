import User from "../models/User.js";

// Leaderboard distance
export const getLeaderboardByDistance = async (req, res) => {
  try {
    const users = await User.find()
      .sort({ distance: -1 })
      .select("username distance territories")
      .limit(10);

    res.json(users);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};
// Leaderboard territories
export const getLeaderboardByTerritories = async (req, res) => {
  try {
    const users = await User.find()
      .sort({ territories: -1 }) // highest territories first
      .select("username distance territories")
      .limit(10);

    res.json(users);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};
