const express = require("express");
const router = express.Router();

const ctrl = require("../controllers/boards");
const { validateBody, isValidId, authenticate } = require("../middlewares");
const { schemas } = require("../models/board");

router.get("/", authenticate, ctrl.getAllBoard);
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
  "/:id/columns",
  authenticate,
  validateBody(schemas.addColumnSchema),
  ctrl.addColumn
);
router.patch(
  "/:id/columns/:idColumn",
  authenticate,
  isValidId,
  validateBody(schemas.addColumnSchema),
  ctrl.updateByIdColumn
);
router.delete(
  "/:id/columns/:idColumn",
  authenticate,
  isValidId,
  ctrl.deleteByIdColumn
);

module.exports = router;
