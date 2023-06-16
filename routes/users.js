const express = require("express");

const ctrl = require("../controllers/users");

const { validateBody, authenticate } = require("../middlewares");

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

router.post("/logout", authenticate, ctrl.logout);

module.exports = router;
