const { Board } = require("../models/board");
const { Task } = require("../models/task");
const { ctrlWrapper, HttpError } = require("../helpers");

const getAllBoard = async (req, res) => {
  const { _id: userId } = req.user;
  const result = await Board.find({ userId });

  res.status(200).json(result);
};

const addBoard = async (req, res) => {
  const { _id: userId } = req.user;
  const result = await Board.create({ ...req.body, userId });

  res.status(201).json(result);
};

const updateByIdBoard = async (req, res) => {
  const { id } = req.params;
  const result = await Board.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.status(200).json(result);
};

const deleteByIdBoard = async (req, res) => {
  const { id: boardId } = req.params;
  const board = await Board.findByIdAndRemove(boardId);
  if (!board) {
    throw HttpError(404, "Not found");
  }
  await Task.deleteMany({ boardId });

  res.status(204).json({
    message: "Board deleted",
  });
};

const addColumn = async (req, res) => {
  const { id: boardId } = req.params;
  const board = await Board.findById({ _id: boardId });
  if (!board) {
    throw HttpError(404, "Not found");
  }
  board.columns.push({ ...req.body, boardId });
  const result = await Board.findByIdAndUpdate(
    { _id: boardId },
    { ...board },
    {
      new: true,
    }
  );

  res.status(201).json(result);
};

const updateByIdColumn = async (req, res) => {
  const { id: boardId, idColumn } = req.params;
  const { title } = req.body;
  const board = await Board.findById({ _id: boardId });
  if (!board) {
    throw HttpError(404, "Not found");
  }
  board.columns.map((e) => {
    if (e.id === idColumn) e.title = title;
    return e;
  });
  await Board.findByIdAndUpdate(
    { _id: boardId },
    { ...board },
    {
      new: true,
    }
  );

  res.status(200).json({ title });
};

const deleteByIdColumn = async (req, res) => {
  const { id: boardId, idColumn } = req.params;
  const board = await Board.findById({ _id: boardId });
  if (!board) {
    throw HttpError(404, "Not found");
  }
  const updateBoard = board.columns.filter((e) => e.id !== idColumn);
  await Task.deleteMany({ idColumn });
  await Board.findByIdAndUpdate(
    { _id: boardId },
    { columns: updateBoard },
    {
      new: true,
    }
  );

  res.status(204).json({
    message: "Column deleted",
  });
};

module.exports = {
  getAllBoard: ctrlWrapper(getAllBoard),
  addBoard: ctrlWrapper(addBoard),
  updateByIdBoard: ctrlWrapper(updateByIdBoard),
  deleteByIdBoard: ctrlWrapper(deleteByIdBoard),
  addColumn: ctrlWrapper(addColumn),
  updateByIdColumn: ctrlWrapper(updateByIdColumn),
  deleteByIdColumn: ctrlWrapper(deleteByIdColumn),
};
