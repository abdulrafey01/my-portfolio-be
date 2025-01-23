const { validationResult } = require("express-validator");

exports.runValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).send({
      success: false,
      message: "Validation Error",
      error: errors.array()[0].msg,
    });
  }
  next();
};
