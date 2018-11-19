const express = require('express');
const router = express.Router();

const studentsController = require('../controllers/students');

/**
 * Handles students GET request
 *
 * Example: /api/students
 */
router.get('/', studentsController.getStudents);

module.exports = router;