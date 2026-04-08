import { Strategy as LocalStrategy } from "passport-local";
import pool from "../db/pool.js";

export default function (passport) {
  passport.use(
    new LocalStrategy(
      { usernameField: "email", passwordField: "email" },
      async (email, password, done) => {
        try {
          const [rows] = await pool.query(
            "SELECT email, level FROM users WHERE email = ?",
            [email]
          );

          if (rows.length === 0) return done(null, false);

          const user = rows[0];
          return done(null, user);

        } catch (err) {
          return done(err);
        }
      }
    )
  );
}