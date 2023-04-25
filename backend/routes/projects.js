const express = require('express');
const { getProject, getProjects, createProject, deleteProject, updateProject } = require('../controllers/projectController');

const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

// require auth for all routes
router.use(requireAuth);

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
