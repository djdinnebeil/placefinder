// backend/utils/validation.js
const { validationResult } = require('express-validator');

// Middleware for formatting errors from express-validator middleware
const handleValidationErrors = (req, _res, next) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    const errors = {};
    validationErrors
      .array()
      .forEach(error => errors[error.path] = error.msg);

    const err = Error("Bad Request");
    err.errors = errors;
    err.status = 400;
    next(err);
  }
  next();
};

module.exports = {
  handleValidationErrors
};