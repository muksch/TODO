const express = require('express');
const { getProject, getProjects, createProject, deleteProject, updateProject } = require('../controllers/projectController');

const router = express.Router();

// GET all projects
router.get('/', getProjects);

// GET a single project
router.get('/:id', getProject);

// UPDATE project
router.patch('/:id', updateProject);

// POST a new project
router.post('/', createProject);

// DELETE a project
router.delete('/:id', deleteProject);

module.exports = router;
