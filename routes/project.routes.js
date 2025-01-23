const express = require("express");
const router = express.Router();
const {
  getAllProjects,
  addProject,
  deleteProject,
  deleteAllProjects,
  updateProject,
} = require("../controllers/project.controller");
const { runValidation } = require("../validators");

const projectValidator = require("../validators/project.validator");
const uploadMulter = require("../middlewares/multer");

router.get("/", getAllProjects);
router.post(
  "/",
  // body is formData but multer will convert all other fields to json and images to req.files
  uploadMulter.any(),
  projectValidator,
  runValidation,
  addProject
);
router.put("/:id", uploadMulter.any(), updateProject);
router.delete("/:id", deleteProject);
router.delete("/", deleteAllProjects);

module.exports = router;
