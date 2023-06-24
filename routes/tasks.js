const express = require("express");
const ctrl = require("../controllers/tasks")
const {validateBody, authenticate} = require('../middlewares')
const {schemas} = require('../models/task');
const { isValidId } = require("../middlewares");

const router = express.Router();

router.post("/", authenticate,  validateBody(schemas.addSchema), ctrl.addTask);

router.get("/", authenticate, ctrl.getAllTasks);

router.delete("/", authenticate,  ctrl.deleteAllTasks);


router.get("/columns/:id", authenticate,  isValidId, ctrl.getColumnTasks);

router.delete("/columns/:id", authenticate,  isValidId, ctrl.deleteColumnTasks);


router.delete("/:id", authenticate,  isValidId, ctrl.deleteTaskById);

router.get("/:id", authenticate,  isValidId, ctrl.getTaskById);

router.put("/:id", authenticate,  isValidId,  validateBody(schemas.updateSchema), ctrl.updateTaskById);

module.exports = router;