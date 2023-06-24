const { Task } = require("../models/task");
const { HttpError, ctrlWrapper } = require("../helpers");

// tasks

const addTask = async (req, res) => {
	const { _id: userId } = req.user;

	const newTask = await Task.create({ ...req.body, userId });
	return res.status(201).json(newTask);
};

const getAllTasks = async (req, res) => {
	const { _id: owner } = req.user;
	console.log(owner);
	const list = await Task.find({ userId: owner }, " -updatedAt");
	res.status(200).json(list);
};

const deleteAllTasks = async (req, res) => {
	const { _id: userId } = req.user;
	const result = await Task.deleteMany({ userId });
	// console.log("result", result)
	if (!result) {
		throw HttpError(404, "Not found");
	}
	return res
		.status(200)
		.json({ message: "Tasks deleted", deletedCount: result.deletedCount });
};

// tasks/columns/{columnId}

const getColumnTasks = async (req, res) => {
	const { id: columnId } = req.params;

	const list = await Task.find({ columnId}, " -updatedAt");
	res.status(200).json(list);
};

const deleteColumnTasks = async (req, res) => {
	const { id: columnId } = req.params;
	const result = await Task.deleteMany({columnId});

	if (!result) {
		throw HttpError(404, "Not found");
	}
	return res.status(200).json({ message: "Tasks deleted", deletedCount: result.deletedCount });
};

// tasks/{taskId}

const deleteTaskById = async (req, res) => {
	const { id } = req.params;
	const deletedTask = await Task.findByIdAndRemove(id);

	if (!deletedTask) {
		throw HttpError(404, "Not found");
	}
	return res.status(204).json({ message: "Task deleted" });
	// return res.status(200).json(deletedTask);
};

const getTaskById = async (req, res) => {
	const { id } = req.params;
	const taskById = await Task.findById(id);

	if (!taskById) {
		throw HttpError(404, "Not found");
	}
	res.status(200).json(taskById);
}

const  updateTaskById = async (req, res)=> {
	const { id } = req.params;

	const updatedTask = await Task.findByIdAndUpdate(id, req.body, {
		new: true,
	});

	if (!updatedTask) {
		throw HttpError(404, "Not found");
	}
	return res.status(200).json(updatedTask);
}

module.exports = {
	addTask: ctrlWrapper(addTask),
	getAllTasks: ctrlWrapper(getAllTasks),
	deleteAllTasks: ctrlWrapper(deleteAllTasks),

	getColumnTasks: ctrlWrapper(getColumnTasks),
	deleteColumnTasks: ctrlWrapper(deleteColumnTasks),

	deleteTaskById: ctrlWrapper(deleteTaskById),
	getTaskById: ctrlWrapper(getTaskById),
	updateTaskById: ctrlWrapper(updateTaskById),
};
