import express from "express";
import passport from "passport";

const router = express.Router();

// Google login
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    prompt: "select_account"
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login.html" }),
  (req, res) => res.redirect("/imin.html")
);

// Logout
router.get("/logout", (req, res, next) => {
  req.logout(err => {
    if (err) return next(err);

    req.session.destroy(() => {
      res.clearCookie("connect.sid");
      res.redirect("/index.html");
    });
  });
});

export default router;