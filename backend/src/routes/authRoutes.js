import express from "express";
import passport from "../config/passport.js";

const router = express.Router();

router.get(
  "/google",
  passport.authenticate("google", { 
    scope: ["profile", "email"], 
    session: false, 
    prompt: "consent"
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/api/auth/google/fail", session: false }),
  (req, res) => {
    const { user, token } = req.user;

    // redirect to mobile app
    return res.json({
      msg: "Google login successful 🚀",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        displayName: user.displayName,
        avatar: user.avatar,
      },
    });
  }
);

router.get("/google/fail", (req, res) => {
  res.status(401).json({ msg: "Google login failed" });
});

export default router;
