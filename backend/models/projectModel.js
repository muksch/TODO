const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const projectTagSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const projectSchema = new Schema(
  {
    projectTitle: {
      type: String,
      required: true,
    },
    projectDescription: {
      type: String,
      required: false,
    },
    projectTags: {
      type: [projectTagSchema],
      required: false,
    },
    user_id: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Project', projectSchema);
