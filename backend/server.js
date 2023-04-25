require('dotenv').config();
const express = require('express');

// express app
const app = express();
const mongoose = require('mongoose');
const tagRoutes = require('./routes/tags');
const projectsRoutes = require('./routes/projects.js');
const userRoutes = require('./routes/user.js');

// ======= START middleware =======
// get access to request data
app.use(express.json());

// log reqest
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.use('/api/tags', tagRoutes);
app.use('/api/projects', projectsRoutes);
app.use('/api/user', userRoutes);
// ======= END middleware =======

// connect to DB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // listen for request
    app.listen(process.env.PORT, () => {
      console.log('connected to DB and listening on port', process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
