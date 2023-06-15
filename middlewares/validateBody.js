const { HttpError } = require("../helpers");

const validateBody = (schema) => {
  const func = (req, res, next) => {
    const isEmpty = Object.keys(req.body).length;
    const { error } = schema.validate(req.body);

    if (!isEmpty) {
      next(HttpError(400, "Missing fields"));
    }
    if (error) {
      next(HttpError(400, error.message));
    }
    next();
  };

  return func;
};

module.exports = validateBody;
