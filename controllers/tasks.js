const { Task } = require("../models/task");
const {
   HttpError, 
   ctrlWrapper } = require("../helpers");

const addTask = async (req, res) => {

	const { _id: owner } = req.user;

	const newTask = await Task.create({ ...req.body, owner });
  const {_id, title, text, priority, deadline, createdAt} = newTask
	
  return res.status(201).json({
    id: _id,
    title,
    text,
    priority,
    deadline,
    createdAt,
    owner
  });
}

const deleteTask = async (req, res) => {
	const { id } = req.params;
	const deletedTask = await Task.findByIdAndRemove(id);

	if (!deletedTask) {
		throw HttpError(404, "Not found");
	}
	return res.status(204).json({ message: "Task deleted" });
  // return res.status(200).json(deletedTask);

}

const getAllTasks = async (req, res) => {
	const { _id: owner } = req.user;
  		const list = await Task.find({ owner }, " -updatedAt");
		res.json(list);
    }


// async function getTaskById(req, res) {
// 	const { id } = req.params;
// 	const TaskById = await Task.findById(id);

// 	if (!taskById) {
// 		throw HttpError(404, "Not found");
// 	}
// 	res.json(taskById);
// }

// async function updateTaskById(req, res) {
// 	const { id } = req.params;

// 	const updatedTask = await Task.findByIdAndUpdate(id, req.body, {
// 		new: true,
// 	});

// 	if (!updatedTask) {
// 		throw HttpError(404, "Not found");
// 	}
// 	return res.status(200).json(updatedTask);
// }

// async function updateStatusTask(req, res) {
// 	const { id } = req.params;
// 	console.log(id);

// 	const updatedTask = await Task.findByIdAndUpdate(id, req.body, {
// 		new: true,
// 	});

// 	if (!updatedTask) {
// 		throw HttpError(404, "Not found");
// 	}
// 	return res.status(200).json(updatedTask);
// }

module.exports = {
  addTask: ctrlWrapper(addTask),
	deleteTask: ctrlWrapper(deleteTask),
	getAllTasks: ctrlWrapper(getAllTasks),
	// getTaskById: ctrlWrapper(getTaskById),
	// updateStatusTask: ctrlWrapper(updateStatusTask),
	// updateTaskById: ctrlWrapper(updateTaskById),
};