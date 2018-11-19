const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const studentsRoutes = require('./routes/students');
const studentRoutes = require('./routes/student');

const app = express();
const port = process.env.PORT || 8080;

app.use(bodyParser.json());

// Enable CORS for all origins
app.use(cors());

// API Routes
app.use('/api/students', studentsRoutes);
app.use('/api/student', studentRoutes);

// Serves the website
app.use(express.static('public'));

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});