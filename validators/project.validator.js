const { check } = require("express-validator");

const projectValidator = [
  check("title")
    .isLength({ min: 3, max: 50 })
    .withMessage("Title must be between 3 and 50 characters")
    .isString()
    .withMessage("Title must be a string"),
  check("description")
    .isLength({ min: 10, max: 500 })
    .withMessage("Description must be between 10 and 500 characters")
    .isString()
    .withMessage("Description must be a string"),
  check("features")
    .isArray()
    .withMessage("Features must be an array")
    .isLength({ min: 1 })
    .withMessage("At least one feature is required"),
  check("features.*").isString().withMessage("Each feature must be a string"), //* means that each feature in the array must be a string
  check("myRole")
    .isString()
    .withMessage("My role must be a string")
    .isLength({ min: 3, max: 50 })
    .withMessage("My-Role must be between 3 and 50 characters"),
  check("target")
    .isString()
    .withMessage("Target must be a string")
    .isLength({ min: 3, max: 50 })
    .withMessage("Target must be between 3 and 50 characters"),
  check("technologies")
    .isString()
    .withMessage("Technologies must be a string")
    .isLength({ min: 3, max: 50 })
    .withMessage("Technologies must be between 3 and 50 characters"),
  check("link")
    .isString()
    .withMessage("Link must be a string")
    .isLength({ min: 3, max: 200 })
    .withMessage("Link must be between 3 and 200 characters"),
];

module.exports = projectValidator;
