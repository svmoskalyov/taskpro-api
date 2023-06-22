const express = require("express");

const ctrl = require("../controllers/users");

const {
  validateBody,
  authenticate,
  uploadCloud,
  passport,
} = require("../middlewares");

const { schemas } = require("../models/user");

const router = express.Router();

router.get(
  "/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  ctrl.googleAuth
);

router.post("/register", validateBody(schemas.registerSchema), ctrl.register);

router.post("/login", validateBody(schemas.loginSchema), ctrl.login);

router.post("/refresh", validateBody(schemas.refreshTokenSchema), ctrl.refresh);

router.get("/current", authenticate, ctrl.getCurrent);

router.put(
  "/profile",
  authenticate,
  validateBody(schemas.updateProfileSchema),
  ctrl.updateProfile
);

router.put(
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

router.post("/help", authenticate, validateBody(schemas.helpSchema), ctrl.help);

router.post("/logout", authenticate, ctrl.logout);

module.exports = router;
