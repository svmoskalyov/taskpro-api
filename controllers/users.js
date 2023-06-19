const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { User } = require("../models/user");
const { ctrlWrapper, HttpError, sendEmail } = require("../helpers");

const { ACCESS_SECRET_KEY, REFRESH_SECRET_KEY } = process.env;

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

  const accessToken = jwt.sign(payload, ACCESS_SECRET_KEY, {
    expiresIn: "23h",
  });
  const refreshToken = jwt.sign(payload, REFRESH_SECRET_KEY, {
    expiresIn: "7d",
  });

  await User.findByIdAndUpdate(user._id, { accessToken, refreshToken });

  res.json({
    accessToken,
    refreshToken,
  });
};

const refresh = async (req, res) => {
  const { refreshToken: token } = req.body;

  try {
    const { id } = jwt.verify(token, REFRESH_SECRET_KEY);
    const isExist = await User.findOne({ refreshToken: token });
    if (!isExist) {
      throw HttpError(403, "invalid token");
    }

    const payload = {
      id,
    };

    const accessToken = jwt.sign(payload, ACCESS_SECRET_KEY, {
      expiresIn: "23h",
    });
    const refreshToken = jwt.sign(payload, REFRESH_SECRET_KEY, {
      expiresIn: "7d",
    });

    await User.findByIdAndUpdate(id, { accessToken, refreshToken });

    res.json({
      accessToken,
      refreshToken,
    });
  } catch (error) {
    throw HttpError(403, error.message);
  }
};

const getCurrent = async (req, res) => {
  const { email } = req.user;

  res.json({
    email,
  });
};

const updateProfile = async (req, res) => {
  const { id } = req.user;

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
  const { id } = req.user;
  const result = await User.findByIdAndUpdate(id, req.body, { new: true });

  res.json({
    theme: result.theme,
  });
};

const help = async (req, res) => {
  const { email, comment } = req.body;

  const helpEmail = {
    to: email,
    subject: "Help with TaskPro",
    html: `<h5>Our specialist will contact you soon.</h5> <h6>We have received your message for help with the TaskPro:</h6> <p>${comment}</p>`,
  };

  await sendEmail(helpEmail);

  res.status(200).json({
    message: "Email send successful",
  });
};

const logout = async (req, res) => {
  const { id } = req.user;
  await User.findByIdAndUpdate(id, { accessToken: "", refreshToken: "" });

  res.status(204).send();
};

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  refresh: ctrlWrapper(refresh),
  getCurrent: ctrlWrapper(getCurrent),
  updateProfile: ctrlWrapper(updateProfile),
  updateAvatar: ctrlWrapper(updateAvatar),
  theme: ctrlWrapper(theme),
  help: ctrlWrapper(help),
  logout: ctrlWrapper(logout),
};
