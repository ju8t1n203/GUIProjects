import express from "express";
import requireAuth from "../middleware/requireAuth.js";

const router = express.Router();

router.get("/me", (req, res) => {
  if (!req.user) {
    return res.status(401).json({ error: "Not logged in" });
  }

  res.json({
    email: req.user.email,
    level: req.user.level
  });
});

router.get("/usability", (req, res) => {
  if (!req.user) {
    return res.status(401).json({ error: "Not logged in" });
  }

  const level = req.user.level;

  let features = [];

  switch (level) {
    case 1: features = [ "Available Tabs:", "Search,", "Consume,", "Restock,", "Picklist"]; break;
    case 2: features = ["All tabs available"]; break;
    case 3: features = ["All tabs available and user management"]; break;
  }

  res.json({ features });
});


/*router.get("/admin", requireLevel(3), (req, res) => {
  res.json({ secret: "Only level 3 can see this" });
});

router.post("/manage", requireLevel(2), (req, res) => {
  res.json({ secret: "Only level 2 can see this" });
});

router.post("/user", requireLevel(1), (req, res) => {
  res.json({ ok: true });
});*/

export default router;