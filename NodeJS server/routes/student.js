const express = require('express');
const router = express.Router();

const studentController = require('../controllers/student');

/**
 * Handles student GET request
 *
 * Example: /api/student/15
 */
router.get('/:id', studentController.getStudent);

/**
 * Handles student POST request
 *
 * Example: /api/student
 */
router.post('/', studentController.createStudent);

/**
 * Handles student PATCH request
 *
 * Example: /api/student/15
 */
router.patch('/:id', studentController.updateStudent);

/**
 * Handles student DELETE request
 *
 * Example: /api/student/15
 */
router.delete('/:id', studentController.deleteStudent);

module.exports = router;