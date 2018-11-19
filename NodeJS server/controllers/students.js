const Student = require('../models/student');

/**
 * Fetches all students
 *
 * ============= SUCCESS ============
 *
 * Fetch successful
 * Code: 200
 * Body: Fetched students
 *
 * ============= ERRORS =============
 *
 * Server error
 * Code: 500
 *
 * @param req HTTP Request
 * @param res HTTP Response
 * @return {Promise<void>}
 */
exports.getStudents = async (req, res) => {
  try {
    const result = await Student.fetchAll();
    res.status(200).json(result[0]);
  } catch (e) {
    console.error(`Error while fetching all students: Error: ${e}`);
    res.status(500).send();
  }
};