import express from "express";
import session from "express-session";
import passport from "passport";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import passportConfig from "./passport/index.js";
import authRoutes from "./routes/auth.js";
import apiRoutes from "./routes/api.js";

dotenv.config();

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
  })
);

app.use(passport.initialize());
app.use(passport.session());
passportConfig(passport);

app.use(express.static(path.join(__dirname, "public")));

app.use("/auth", authRoutes);
app.use("/api", apiRoutes);

app.listen(3000, () => console.log("Server running on port 3000"));