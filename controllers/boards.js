const { Board } = require("../models/board");
const { ctrlWrapper, HttpError } = require("../helpers");

const addBoard = async (req, res) => {
  const { _id: owneredUser } = req.user;
  const result = await Board.create({ ...req.body, owneredUser });
  const { _id: id, title, icon, background, columns } = result;

  res.status(201).json({
    id,
    owneredUser,
    title,
    icon,
    background,
    columns,
  });
};

const updateByIdBoard = async (req, res) => {
  const { id } = req.params;
  const result = await Board.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw HttpError(404, "Not found");
  }
  const { owneredUser, title, icon, background, columns } = result;

  res.status(201).json({
    id,
    owneredUser,
    title,
    icon,
    background,
    columns,
  });
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

const addColumn = async (req, res) => {};

const updateByIdColumn = async (req, res) => {};

const deleteByIdColumn = async (req, res) => {};

module.exports = {
  addBoard: ctrlWrapper(addBoard),
  updateByIdBoard: ctrlWrapper(updateByIdBoard),
  deleteByIdBoard: ctrlWrapper(deleteByIdBoard),
  addColumn: ctrlWrapper(addColumn),
  updateByIdColumn: ctrlWrapper(updateByIdColumn),
  deleteByIdColumn: ctrlWrapper(deleteByIdColumn),
};
