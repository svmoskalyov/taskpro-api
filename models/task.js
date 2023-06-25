const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../helpers");
const Joi = require("joi");

const taskSchema = new Schema(
	{
		userId: {
			type: Schema.Types.ObjectId,
			ref:"user",
			required: true,
		},
		boardId: {
			type: Schema.Types.ObjectId,
			ref:"board",
			required: [true, "Set task boardId"],
		},
			columnId: {
				type: String,
			required: [true, "Set task columnId"],
		},
		title: {
			type: String,
			required: [true, "Set task title"],
		},
		text: {
			type: String,
			required: [true, "Set task text"],
		},
		priority: {
			type: String,
			required: [true, "Set task priority"],
		},
		deadline: {
			type: Date,
			default: false,
		}
		   
		},
	{ versionKey: false, timestamps: true }
);

taskSchema.post("save", handleMongooseError);

const addSchema = Joi.object({
	title: Joi.string().min(3).max(100).required(),
	text: Joi.string().max(500),
	priority: Joi.string().valid("low", "middle", "high", "none"),
	deadline: Joi.string(),
	boardId: Joi.string().required(),
	columnId: Joi.string().required(),

});

const updateSchema = Joi.object({
  title: Joi.string().min(3).max(100),
	text: Joi.string().max(500),
	priority: Joi.string().valid("low", "middle", "high", "none"),
	deadline: Joi.date(),
});

const schemas = {
	addSchema,
  updateSchema, 
};

const Task = model("task", taskSchema);

module.exports = { Task, schemas };