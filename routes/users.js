const express = require("express");

const ctrl = require("../controllers/users");

const { validateBody, authenticate, uploadCloud } = require("../middlewares");

const { schemas } = require("../models/user");

const router = express.Router();

router.post("/register", validateBody(schemas.registerSchema), ctrl.register);

router.post("/login", validateBody(schemas.loginSchema), ctrl.login);

router.put(
  "/profile",
  authenticate,
  validateBody(schemas.registerSchema),
  ctrl.updateProfile
);

router.post(
  "/avatar",
  authenticate,
  uploadCloud.single("avatar"),
  ctrl.updateAvatar
);

router.patch(
  "/theme",
  authenticate,
  validateBody(schemas.themeSchema),
  ctrl.theme
);

router.post("/logout", authenticate, ctrl.logout);

module.exports = router;
