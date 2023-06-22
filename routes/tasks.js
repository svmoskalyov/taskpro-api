const express = require("express");
const ctrl = require("../controllers/tasks")
const {validateBody, authenticate} = require('../middlewares')
const {schemas} = require('../models/task');
const { isValidId } = require("../middlewares");

const router = express.Router();

router.post("/", authenticate,  validateBody(schemas.addSchema), ctrl.addTask);

router.delete("/:id", authenticate,  isValidId, ctrl.deleteTask);

router.get("/", authenticate, ctrl.getAllTasks);

// router.get("/:id",authenticate,  isValidId, ctrl.getTaskById);


// router.put("/:id", authenticate,  isValidId,  validateBody(schemas.addSchema), ctrl.updateTaskById);

// router.patch("/:id/favorite", authenticate,  isValidId,  validateFavorite(schemas.updateFavoriteSchema), ctrl.updateStatusTask);



module.exports = router;