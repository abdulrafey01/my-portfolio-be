const Project = require("../models/project.model");
const { uploadFile } = require("../services/backblaze.service");

exports.getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find().select(["-__v", "-_id"]);
    res.status(200).send({
      success: true,
      message: "All Projects fetched successfully",
      data: projects,
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: "Internal Server Error",
      error: err,
    });
  }
};

exports.addProject = async (req, res) => {
  try {
    if (!req.files.length > 0) {
      return res.status(400).send({
        success: false,
        message: "No images uploaded",
      });
    }

    req.body.images = [];
    for (let i = 0; i < req.files.length; i++) {
      let image = await uploadFile(req.files[i]);
      req.body.images.push(image);
    }

    const newProject = new Project(req.body);
    await newProject.save();
    res.status(200).send({
      success: true,
      message: "Project added successfully",
      data: newProject,
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: "Internal Server Error",
      error: err,
    });
  }
};

exports.updateProject = async (req, res) => {
  try {
    let project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).send({
        success: false,
        message: "Project not found",
      });
    }
    if (!req.files.length > 0) {
      return res.status(400).send({
        success: false,
        message: "No images uploaded",
      });
    }

    req.body.images = [];
    for (let i = 0; i < req.files.length; i++) {
      let image = await uploadFile(req.files[i]);
      req.body.images.push(image);
    }

    project = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).send({
      success: true,
      message: "Project updated successfully",
      data: project,
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: "Internal Server Error",
      error: err,
    });
  }
};

exports.deleteProject = async (req, res) => {
  try {
    let project = await Project.findByIdAndDelete(req.params.id);
    if (!project) {
      return res.status(404).send({
        success: false,
        message: "Project not found",
      });
    }
    res.status(200).send({
      success: true,
      message: "Project deleted successfully",
      data: project,
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: "Internal Server Error",
      error: err,
    });
  }
};

exports.deleteAllProjects = async (req, res) => {
  try {
    await Project.deleteMany({});
    res.status(200).send({
      success: true,
      message: "All projects deleted successfully",
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: "Internal Server Error",
      error: err,
    });
  }
};
