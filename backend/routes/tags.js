const express = require('express');
const { getTag, getTags, createTag, deleteTag, updateOrder } = require('../controllers/tagController');

const router = express.Router();

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
