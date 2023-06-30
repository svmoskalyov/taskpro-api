const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { User } = require("../models/user");
const { ctrlWrapper, HttpError, sendEmail } = require("../helpers");

const {
  HASH_POWER,
  JWT_ACCESS_SECRET_KEY,
  JWT_REFRESH_SECRET_KEY,
  JWT_ACCESS_EXPIRE_TIME,
  JWT_REFRESH_EXPIRE_TIME,
  FRONTEND_URL,
} = process.env;

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email already in use");
  }
  const hashPassword = await bcrypt.hash(password, Number(HASH_POWER));
  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
  });

  res.status(201).json({
    name: newUser.name,
    email: newUser.email,
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }

  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, "Email or password is wrong");
  }

  let accessToken = "";
  let refreshToken = "";

  if (user.accessToken !== "") {
    accessToken = user.accessToken;
    refreshToken = user.refreshToken;
  } else {
    const payload = {
      id: user._id,
    };
    accessToken = jwt.sign(payload, JWT_ACCESS_SECRET_KEY, {
      expiresIn: JWT_ACCESS_EXPIRE_TIME,
    });
    refreshToken = jwt.sign(payload, JWT_REFRESH_SECRET_KEY, {
      expiresIn: JWT_REFRESH_EXPIRE_TIME,
    });

    await User.findByIdAndUpdate(user._id, { accessToken, refreshToken });
  }

  res.status(200).json({
    accessToken,
    refreshToken,
  });
};

const googleAuth = async (req, res) => {
  const { _id: id } = req.user;

  const payload = {
    id,
  };

  const accessToken = jwt.sign(payload, JWT_ACCESS_SECRET_KEY, {
    expiresIn: JWT_ACCESS_EXPIRE_TIME,
  });
  const refreshToken = jwt.sign(payload, JWT_REFRESH_SECRET_KEY, {
    expiresIn: JWT_REFRESH_EXPIRE_TIME,
  });

  await User.findByIdAndUpdate(id, { accessToken, refreshToken });

  res
    .status(200)
    .redirect(
      `${FRONTEND_URL}?accessToken=${accessToken}&refreshToken=${refreshToken}`
    );
};

const refresh = async (req, res) => {
  const { refreshToken: token } = req.body;

  try {
    const { id } = jwt.verify(token, JWT_REFRESH_SECRET_KEY);
    const isExist = await User.findOne({ refreshToken: token });
    if (!isExist) {
      throw HttpError(403, "invalid token");
    }

    const payload = {
      id,
    };

    const accessToken = jwt.sign(payload, JWT_ACCESS_SECRET_KEY, {
      expiresIn: JWT_ACCESS_EXPIRE_TIME,
    });
    const refreshToken = jwt.sign(payload, JWT_REFRESH_SECRET_KEY, {
      expiresIn: JWT_REFRESH_EXPIRE_TIME,
    });

    await User.findByIdAndUpdate(id, { accessToken, refreshToken });

    res.status(200).json({
      accessToken,
      refreshToken,
    });
  } catch (error) {
    throw HttpError(403, error.message);
  }
};

const getCurrent = async (req, res) => {
  const { name, email, avatarURL, theme } = req.user;

  res.status(200).json({
    name,
    email,
    avatarURL,
    theme,
  });
};

const updateProfile = async (req, res) => {
  const { id } = req.user;
  const { password } = req.body;
  const hashPassword = await bcrypt.hash(password, Number(HASH_POWER));

  const result = await User.findByIdAndUpdate(
    id,
    {
      ...req.body,
      password: hashPassword,
    },
    { new: true }
  );
  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.status(200).json({
    name: result.name,
    email: result.email,
  });
};

const updateAvatar = async (req, res) => {
  const { id } = req.user;
  const { path: avatarURL, filename: avatarName } = req.file;

  await User.findByIdAndUpdate(id, { avatarURL, avatarName });

  res.status(200).json({
    avatarURL,
  });
};

const theme = async (req, res) => {
  const { id } = req.user;
  const result = await User.findByIdAndUpdate(id, req.body, { new: true });

  res.status(200).json({
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
  googleAuth: ctrlWrapper(googleAuth),
  refresh: ctrlWrapper(refresh),
  getCurrent: ctrlWrapper(getCurrent),
  updateProfile: ctrlWrapper(updateProfile),
  updateAvatar: ctrlWrapper(updateAvatar),
  theme: ctrlWrapper(theme),
  help: ctrlWrapper(help),
  logout: ctrlWrapper(logout),
};
