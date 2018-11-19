const Ajv = require('ajv');

const Student = require('../models/student');

/**
 * Fetches a student by id
 *
 * ============= SUCCESS ============
 *
 * Fetch successful
 * Code: 200
 * Body: Fetched student
 *
 * ============= ERRORS =============
 *
 * Student not found
 * Code: 404
 *
 * Server error
 * Code: 500
 *
 * @param req HTTP Request
 * @param res HTTP Response
 * @return {Promise<void>}
 */
exports.getStudent = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await Student.fetchById(id);
    if (result[0].length > 0) {
      res.status(200).send(result[0]);
    } else {
      res.status(404).send()
    }
  } catch (e) {
    console.error(`Error while fetching student with id ${id}. Error: ${e}`);
    res.status(500).send();
  }
};

/**
 * Creates a new student and sends back an appropriate response
 *
 * ============= SUCCESS ============
 *
 * Create successful
 * Code: 201
 * Body: Created student
 *
 * Create successful, retrieval of the created student unsuccessful
 * Code: 201
 *
 * ============= ERRORS =============
 *
 * Invalid student schema
 * Code: 400
 * Error: Invalid student schema
 *
 * Server error
 * Code: 500
 *
 * @param req HTTP Request
 * @param res HTTP Response
 * @return {Promise<void>}
 */
exports.createStudent = async (req, res) => {
  // Validate request
  const ajv = new Ajv({allErrors: true, format: 'full'});
  const studentSchema = Student.getValidationSchema();
  const student = req.body;
  const valid = ajv.validate(studentSchema, student);
  // Request is not valid
  if (!valid) {
    console.log(ajv.errors);
    res.status(400).send({message: 'Invalid student schema'});
  // Request is valid
  } else {
    try {
      const result = await Student.create(student);
      const id = result[0].insertId;
      if (result[0].affectedRows === 1) {
        const newStudent = await Student.fetchById(id);
        (newStudent[0].length > 0) ? res.status(201).send(newStudent[0].toString) : res.status(201).send();
      }
    } catch (e) {
      console.error(`Error while creating student. Error: ${e}`);
      (e.toString().includes('Incorrect date value'))
          ? res.status(500).send({message: 'Date format is invalid. Expecting YYYY-MM-DD'})
          : res.status(500).send();
    }
  }
};

/**
 * Updates the student and sends back an appropriate response
 *
 * ============= SUCCESS ============
 *
 * Update successful
 * Code: 200
 * Body: Updated student
 *
 * Update successful, retrieval of the updated student unsuccessful
 * Code: 204
 *
 * ============= ERRORS =============
 *
 * Invalid student schema
 * Code: 400
 * Error: Invalid student schema
 *
 * Student not found
 * Code: 404
 *
 * Server error
 * Code: 500
 *
 * @param req HTTP Request
 * @param res HTTP Response
 * @return {Promise<void>}
 */
//TODO: Ajv validation and date
exports.updateStudent = async (req, res) => {
  // Validate request
  const ajv = new Ajv({allErrors: true, format: 'full'});
  const studentSchema = Student.getValidationSchema();
  const student = req.body;
  const valid = ajv.validate(studentSchema, student);
  // Request is not valid
  if (!valid) {
    console.log(ajv.errors);
    res.status(400).send({message: 'Invalid student schema'});
  // Request is valid
  } else {
    try {
      const id = req.params.id;
      const result = await Student.update(id, student);
      if (result[0].affectedRows === 1) {
        const x = await Student.fetchById(id);
        (x[0].length > 0) ? res.status(201).send(x[0]) : res.status(204).send();
      } else {
        res.status(404).send();
      }
    } catch (e) {
      console.error(`Error while updating student. Error: ${e}`);
      (e.toString().includes('Incorrect date value'))
          ? res.status(500).send({message: 'Date format is invalid. Expecting YYYY-MM-DD'})
          : res.status(500).send();
    }
  }
};

/**
 * Deletes a student by id
 *
 * ============= SUCCESS ============
 *
 * Delete successful
 * Code: 204
 *
 * ============= ERRORS =============
 *
 * Student not found
 * Code: 404
 *
 * Server error
 * Code: 500
 *
 * @param req HTTP Request
 * @param res HTTP Response
 * @return {Promise<void>}
 */
exports.deleteStudent = async (req, res) => {
  try {
    const result = await Student.deleteById(req.params.id);
    (result[0].affectedRows > 0) ? res.status(204).send() : res.status(404).send();
  } catch (e) {
    console.error(`Error while deleting student. Error: ${e}`);
    res.status(500).send();
  }
};