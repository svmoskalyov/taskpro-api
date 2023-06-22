const express = require("express");
const router = express.Router();

const ctrl = require("../controllers/boards");
const { validateBody, isValidId, authenticate } = require("../middlewares");
const { schemas } = require("../models/board");

router.post(
  "/",
  authenticate,
  validateBody(schemas.addBoardSchema),
  ctrl.addBoard
);
router.put(
  "/:id",
  authenticate,
  isValidId,
  validateBody(schemas.addBoardSchema),
  ctrl.updateByIdBoard
);
router.delete("/:id", authenticate, isValidId, ctrl.deleteByIdBoard);

router.post(
  "/:id/column",
  authenticate,
  validateBody(schemas.addColumnSchema),
  ctrl.addColumn
);
router.put(
  "/:id/column/:id",
  authenticate,
  isValidId,
  validateBody(schemas.addColumnSchema),
  ctrl.updateByIdColumn
);
router.delete(
  "/:id/column/:id",
  authenticate,
  isValidId,
  ctrl.deleteByIdColumn
);

module.exports = router;
