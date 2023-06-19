const express = require("express");

const ctrl = require("../controllers/users");

const { validateBody, authenticate } = require("../middlewares");

const { schemas } = require("../models/user");

const router = express.Router();

router.post("/register", validateBody(schemas.registerSchema), ctrl.register);

router.post("/login", validateBody(schemas.loginSchema), ctrl.login);

router.get("/current", authenticate, ctrl.getCurrent);

router.put(
  "/profile",
  authenticate,
  validateBody(schemas.registerSchema),
  ctrl.updateProfile
);

router.patch(
  "/theme",
  authenticate,
  validateBody(schemas.themeSchema),
  ctrl.theme
);

router.post("/help", validateBody(schemas.helpSchema), ctrl.help);

router.post("/logout", authenticate, ctrl.logout);

module.exports = router;
