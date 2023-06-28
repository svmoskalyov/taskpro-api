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
			default: "",
			},
		priority: {
			type: String,
			enum: ["low", "medium", "high", "none"],
			default: "none",
		},
		deadline: {
			type: Date,
			
		}
		   
		},
	{ versionKey: false, timestamps: true }
);

taskSchema.post("save", handleMongooseError);

const addSchema = Joi.object({
	title: Joi.string().min(3).required(),
	text: Joi.string().allow("").optional(),
	priority: Joi.string().valid("low", "medium", "high", "none"),
	deadline: Joi.date().optional(),
	boardId: Joi.string().required(),
	columnId: Joi.string().required(),

});

const updateSchema = Joi.object({
  title: Joi.string().min(3).optional(),
	text: Joi.string().allow("").optional(),
	priority: Joi.string().valid("low", "medium", "high", "none"),
	deadline:Joi.date().optional(),
});

const updateColumnSchema = Joi.object({
	columnId: Joi.string().required(),
});

const schemas = {
	addSchema,
  updateSchema, 
	updateColumnSchema
};

const Task = model("task", taskSchema);

module.exports = { Task, schemas };