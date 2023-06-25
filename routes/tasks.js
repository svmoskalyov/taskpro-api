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

// tasks/boards/:id - operations with tasks in one Board by boardId

router.get("/boards/:id", authenticate,  isValidId, ctrl.getBoardTasks);

router.delete("/boards/:id", authenticate,  isValidId, ctrl.deleteBoardTasks);

// tasks/columns/:id - operations with tasks in one Column by columnId

router.get("/columns/:id", authenticate,  isValidId, ctrl.getColumnTasks);

router.delete("/columns/:id", authenticate,  isValidId, ctrl.deleteColumnTasks);

// tasks/:id - operations with one task by taskId

router.delete("/:id", authenticate,  isValidId, ctrl.deleteTaskById);

router.get("/:id", authenticate,  isValidId, ctrl.getTaskById);

router.put("/:id", authenticate,  isValidId,  validateBody(schemas.updateSchema), ctrl.updateTaskById);

module.exports = router;