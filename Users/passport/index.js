import localStrategy from "./local.js";
import googleStrategy from "./google.js";
import pool from "../db/pool.js";

export default function (passport) {
  localStrategy(passport);
  googleStrategy(passport);

  passport.serializeUser((user, done) => {
    done(null, user.email);
  });

  passport.deserializeUser(async (email, done) => {
    const [rows] = await pool.query(
      "SELECT email, level FROM users WHERE email = ?",
      [email]
    );
    done(null, rows[0]);
  });
}