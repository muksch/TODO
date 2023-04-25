const express = require('express');
const { getTag, getTags, createTag, deleteTag, updateOrder } = require('../controllers/tagController');

const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

// require auth for all routes
router.use(requireAuth);

// GET all tags
router.get('/', getTags);

// GET a single tag
router.get('/:id', getTag);

// UPDATE tags order
router.post('/updateOrder', updateOrder);

// POST a new tag
router.post('/', createTag);

// DELETE a tag
router.delete('/:id', deleteTag);

module.exports = router;
