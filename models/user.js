const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleMongooseError } = require("../helpers");

const emailRegexp = /[^\s@]+@[^\s@]+\.[^\s@]+/;

const userSchema = new Schema(
  {
    name: {
      type: String,
      minlength: 2,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      match: emailRegexp,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      minlength: 8,
      required: [true, "Set password for user"],
    },
    accessToken: {
      type: String,
      default: "",
    },
    refreshToken: {
      type: String,
      default: "",
    },
    avatarURL: {
      type: String,
      default: "",
    },
    avatarName: {
      type: String,
      default: "",
    },
    theme: {
      type: String,
      enum: ["dark", "light", "violet"],
      default: "dark",
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", handleMongooseError);

const registerSchema = Joi.object({
  name: Joi.string().min(2).max(32).required(),
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(8).max(64).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(8).max(64).required(),
});

const updateProfileSchema = Joi.object({
  name: Joi.string().min(2).max(32),
  email: Joi.string().pattern(emailRegexp),
  password: Joi.string().min(8).max(64),
});

const refreshTokenSchema = Joi.object({
  refreshToken: Joi.string().required(),
});

const themeSchema = Joi.object({
  theme: Joi.string().valid("dark", "light", "violet"),
});

const helpSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  comment: Joi.string().required(),
});

const schemas = {
  registerSchema,
  loginSchema,
  updateProfileSchema,
  refreshTokenSchema,
  themeSchema,
  helpSchema,
};

const User = model("user", userSchema);

module.exports = {
  User,
  schemas,
};
