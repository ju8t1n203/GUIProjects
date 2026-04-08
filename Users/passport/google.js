import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import pool from "../db/pool.js";
import dotenv from "dotenv";
dotenv.config();

export default function (passport) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/auth/google/callback"
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const email = profile.emails[0].value;

          const [rows] = await pool.query(
            "SELECT email, level FROM users WHERE email = ?",
            [email]
          );

          let user;

          if (rows.length === 0) {
            await pool.query(
              "INSERT INTO users (email, level) VALUES (?, ?)",
              [email, 1]
            );

            user = { email, level: 1 };
          } else {
            user = rows[0];
          }

          return done(null, user);
        } catch (err) {
          return done(err);
        }
      }
    )
  );
}