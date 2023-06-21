const { Task } = require("../models/task");
const {
  //  HttpError, 
   ctrlWrapper } = require("../helpers");

const addTask = async (req, res) => {
	const { _id: owner } = req.user;

	const newTask = await Task.create({ ...req.body, owner });
  const {title, text, priority, deadline, createdAt} = newTask
	
  return res.status(201).json({
    title,
    text,
    priority,
    deadline,
    createdAt,
    owner
  });
}

// const removeTask = async (req, res) => {
// 	const { id } = req.params;
// 	const deletedTask = await Task.findByIdAndRemove(id);

// 	if (!deletedTask) {
// 		throw HttpError(404, "Not found");
// 	}
// 	return res.status(200).json({ message: "Task deleted" });
// }

// const getAllTasks = async (req, res) => {

// 	const { _id: owner } = req.user;
// 	// const { page = 1, limit = 10, favorite } = req.query;
// 	// const skip = (page - 1) * limit;

// 	// if (favorite) {
// 	// 	const list =
// 	// 		favorite === true
// 	// 			? await Task.find(
// 	// 					{ owner, favorite: true },
// 	// 					"-createdAt -updatedAt",
// 	// 					{ skip, limit }
// 	// 			  )
// 	// 			: await Task.find(
// 	// 					{ owner, favorite: false },
// 	// 					"-createdAt -updatedAt",
// 	// 					{ skip, limit }
// 	// 			  );
// 	// 	res.json(list);
// 	// } else {
// 		const list = await Task.find({ owner }, "-createdAt -updatedAt", {
// 			// skip,
// 			// limit,
// 		});
// 		res.json(list);
// 	// }
// }

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
	// removeTask: ctrlWrapper(removeTask),
	// getAllTasks: ctrlWrapper(getAllTasks),
	// getTaskById: ctrlWrapper(getTaskById),
	// updateStatusTask: ctrlWrapper(updateStatusTask),
	// updateTaskById: ctrlWrapper(updateTaskById),
};