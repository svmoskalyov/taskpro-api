const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { User } = require("../models/user");
const { ctrlWrapper, HttpError } = require("../helpers");

const { SECRET_KEY } = process.env;

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  const hashPassword = await bcrypt.hash(password, 10);

  if (user) {
    throw HttpError(409, "Email already in use");
  }

  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
  });

  res.status(201).json({
    user: {
      name: newUser.name,
      email: newUser.email,
    },
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }

  const passwordCompare = bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, "Email or password is wrong");
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
  await User.findByIdAndUpdate(user._id, { token });

  res.json({
    token,
    user: {
      email,
    },
  });
};

const updateProfile = async (req, res) => {
  const { _id: id } = req.user;

  const result = await User.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.json({
    user: {
      name: result.name,
      email: result.email,
    },
  });
};

const updateAvatar = async (req, res) => {
  const { _id } = req.user;
  const { path: avatarURL, filename: avatarName } = req.file;

  await User.findByIdAndUpdate(_id, { avatarURL, avatarName });

  res.status(200).json({
    message: "Successfully uploaded avatar",
    avatarURL,
  });
};

const theme = async (req, res) => {
  const { _id, email } = req.user;
  const result = await User.findByIdAndUpdate(_id, req.body, { new: true });

  res.json({
    email,
    theme: result.theme,
  });
};

const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });

  res.status(204).send();
};

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  updateProfile: ctrlWrapper(updateProfile),
  updateAvatar: ctrlWrapper(updateAvatar),
  theme: ctrlWrapper(theme),
  logout: ctrlWrapper(logout),
};
