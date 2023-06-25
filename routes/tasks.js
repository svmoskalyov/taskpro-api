const express = require("express");
const ctrl = require("../controllers/tasks")
const {validateBody, authenticate} = require('../middlewares')
const {schemas} = require('../models/task');
const { isValidId } = require("../middlewares");

const router = express.Router();

// tasks - operations with all User's tasks

router.post("/", authenticate,  validateBody(schemas.addSchema), ctrl.addTask);

router.get("/", authenticate, ctrl.getAllTasks);

router.delete("/", authenticate,  ctrl.deleteAllTasks);

// tasks/:id - operations with one task by taskId

router.delete("/:id", authenticate,  isValidId, ctrl.deleteTaskById);

router.get("/:id", authenticate,  isValidId, ctrl.getTaskById);

router.put("/:id", authenticate,  isValidId,  validateBody(schemas.updateSchema), ctrl.updateTaskById);

router.patch("/:id", authenticate,  isValidId,  validateBody(schemas.updateColumnSchema), ctrl.updateTaskColumnById);

module.exports = router;