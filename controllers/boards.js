const { Board } = require("../models/board");
const { ctrlWrapper, HttpError } = require("../helpers");

const getAllBoard = async (req, res) => {
  const { _id: owneredUser } = req.user;
  const result = await Board.find({ owneredUser });

  res.status(200).json(result);
};

const addBoard = async (req, res) => {
  const { _id: owneredUser } = req.user;
  const result = await Board.create({ ...req.body, owneredUser });

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

  res.json(result);
};

const deleteByIdBoard = async (req, res) => {
  const { id } = req.params;
  const result = await Board.findByIdAndRemove(id);
  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.json({
    message: "Board deleted",
  });
};

const addColumn = async (req, res) => {
  const { id: owneredBoard } = req.params;
  const board = await Board.findById({ _id: owneredBoard });
  board.columns.push({ ...req.body, owneredBoard });
  const result = await Board.findByIdAndUpdate(
    { _id: owneredBoard },
    { ...board },
    {
      new: true,
    }
  );

  res.status(201).json(result);
};

const updateByIdColumn = async (req, res) => {
  const { id: owneredBoard, idColumn } = req.params;
  const { title } = req.body;
  const board = await Board.findById({ _id: owneredBoard });
  board.columns.map((e) => {
    if (e.id === idColumn) e.title = title;
    return e;
  });
  await Board.findByIdAndUpdate(
    { _id: owneredBoard },
    { ...board },
    {
      new: true,
    }
  );

  res.status(201).json({ title });
};

const deleteByIdColumn = async (req, res) => {
  const { id: owneredBoard, idColumn } = req.params;
  const board = await Board.findById({ _id: owneredBoard });
  const updateBoard = board.columns.filter((e) => e.id !== idColumn);
  await Board.findByIdAndUpdate(
    { _id: owneredBoard },
    { columns: updateBoard },
    {
      new: true,
    }
  );

  res.json({
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
