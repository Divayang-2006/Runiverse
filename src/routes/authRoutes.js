import express from "express";
import passport from "../config/passport.js";
import jwt from "jsonwebtoken";

const router = express.Router();

// 1) Start Google login (redirects to Google)
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// 2) Google redirects back here after login
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/api/auth/google/fail" }),
  async (req, res) => {
    // req.user is set by Passport in the strategy
    const user = req.user;

    // Issue YOUR JWT so your existing protected routes keep working
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || "1d" }
    );

    // For a mobile app / Postman demo, just return JSON:
    return res.json({
      msg: "Google login successful",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        displayName: user.displayName,
        avatar: user.avatar,
      },
    });

    // If you had a frontend, you could redirect with the token:
    // res.redirect(`myapp://login-success?token=${token}`);
  }
);

router.get("/google/fail", (req, res) => {
  res.status(401).json({ msg: "Google login failed" });
});

export default router;
