// const { Board } = require("../models/board");
const { ctrlWrapper } = require("../helpers");

const addBoard = async (req, res) => {};

const updateByIdBoard = async (req, res) => {};

const deleteByIdBoard = async (req, res) => {};

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
