const Project = require('../models/projectModel');

// get all projects
const getProjects = async (req, res) => {
  const user_id = req.user._id;
  const projects = await Project.find({ user_id }).sort({ updatedAt: 1 });
  res.status(200).json(projects);
};

// get a single project
const getProject = async (req, res) => {
  const { id } = req.params;
  const project = await Project.findById(id);

  if (!project) {
    return res.status(404).json({ error: 'No such project' });
  }
  res.status(200).json(project);
};

// create a new project
const createProject = async (req, res) => {
  const { projectTitle, projectDescription, projectTags } = req.body;

  let emptyFields = [];

  if (!projectTitle) {
    emptyFields.push('title');
  }
  if (emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in all required fields!', emptyFields });
  }

  // add doc to DB
  try {
    const user_id = req.user._id;
    const project = await Project.create({ projectTitle, projectDescription, projectTags, user_id });
    res.status(200).json(project);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a project
const deleteProject = async (req, res) => {
  const { id } = req.params;
  const project = await Project.findByIdAndDelete(id);

  if (!project) {
    return res.status(404).json({ error: 'No such project' });
  }
  res.status(200).json(project);
};

// update project
const updateProject = async (req, res) => {
  const { id } = req.params;
  const { projectTitle, projectDescription, projectTags } = req.body;
  try {
    const project = await Project.findByIdAndUpdate(id, { projectTitle, projectDescription, projectTags }, { new: true });
    if (!project) {
      throw new Error(`Project with ID ${id} not found.`);
    }
    res.status(200).json(project);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getProjects,
  getProject,
  createProject,
  deleteProject,
  updateProject,
};
