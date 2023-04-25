const Tag = require('../models/tagModel');

// get all tags
const getTags = async (req, res) => {
  const user_id = req.user._id;
  const tags = await Tag.find({ user_id }).sort({ order: 1 });

  res.status(200).json(tags);
};

// get a single tag
const getTag = async (req, res) => {
  const { id } = req.params;
  const tag = await Tag.findById(id);

  if (!tag) {
    return res.status(404).json({ error: 'No such tag' });
  }
  res.status(200).json(tag);
};

// create a new tag
const createTag = async (req, res) => {
  const { title, order, color } = req.body;

  let emptyFields = [];

  if (!title) {
    emptyFields.push('title');
  }
  if (emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in all required fields!', emptyFields });
  }

  // add doc to DB
  try {
    const user_id = req.user._id;
    const tag = await Tag.create({ title, order, color, user_id });
    res.status(200).json(tag);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a tag
const deleteTag = async (req, res) => {
  const { id } = req.params;
  const tag = await Tag.findByIdAndDelete(id);

  if (!tag) {
    return res.status(404).json({ error: 'No such tag' });
  }
  res.status(200).json(tag);
};

// update tags order
const updateOrder = async (req, res) => {
  const tags = req.body;
  try {
    const user_id = req.user._id;
    for (let i = 0; i < tags.length; i++) {
      const { _id, order } = tags[i];
      const tag = await Tag.findByIdAndUpdate(_id, { order }, { new: true });
      if (!tag) {
        throw new Error(`Tag with ID ${_id} not found.`);
      }
    }
    const updatedTags = await Tag.find({ user_id }).sort({ order: 1 });
    res.status(200).json(updatedTags);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getTags,
  getTag,
  createTag,
  deleteTag,
  updateOrder,
};
