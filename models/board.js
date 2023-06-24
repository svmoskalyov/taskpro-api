const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleMongooseError } = require("../helpers");

const columnSchema = new Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
  },
  boardId: {
    type: Schema.Types.ObjectId,
    ref: "board",
    required: true,
  },
});

const boardSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    icon: {
      type: String,
      default: "",
    },
    background: {
      type: String,
      default: "",
    },
    columns: [columnSchema],
    userId: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

boardSchema.post("save", handleMongooseError);

const addBoardSchema = Joi.object({
  title: Joi.string().min(1).max(50).required().messages({
    "string.min":
      "{{#label}} length must be at least {{#limit}} characters long",
    "string.max":
      "{{#label}} length must be less than or equal to {{#limit}} characters long",
    "any.required": "missing required {{#label}} field",
  }),
  icon: Joi.string(),
  background: Joi.string(),
  columns: Joi.array().items(
    Joi.object({
      title: Joi.string().required(),
    })
  ),
});

const addColumnSchema = Joi.object({
  title: Joi.string().min(1).max(50).required().messages({
    "string.min":
      "{{#label}} length must be at least {{#limit}} characters long",
    "string.max":
      "{{#label}} length must be less than or equal to {{#limit}} characters long",
    "any.required": "missing required {{#label}} field",
  }),
});

const schemas = {
  addBoardSchema,
  addColumnSchema,
};

const Board = model("board", boardSchema);

module.exports = {
  Board,
  schemas,
};
