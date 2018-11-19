const db = require('../util/database');

module.exports = class Student {

  constructor() {
  }

  /**
   * Creates a new student
   *
   * @param student Student to be created
   * @return {*}
   */
  static create(student) {
    return db.execute('INSERT INTO `students` (firstname, lastname, grade, birth_date) ' +
        'VALUES (?, ?, ?, ?)',
        [student.firstName, student.lastName, student.grade, student.birthDate])
  }

  /**
   * Fetches all students
   *
   * @return {Promise}
   */
  static fetchAll() {
    return db.execute('SELECT ' +
        'id,' +
        '`firstname` AS `firstName`, ' +
        '`lastname` AS `lastName`, ' +
        'grade,' +
        '`birth_date` AS `birthDate` ' +
        'FROM `students`');
  }

  /**
   * Fetches a student by ID
   *
   * @param id Student's id
   * @return {Promise}
   */
  static fetchById(id) {
    return db.execute('SELECT ' +
        'id,' +
        '`firstname` AS `firstName`, ' +
        '`lastname` AS `lastName`, ' +
        'grade,' +
        '`birth_date` AS `birthDate` ' +
        'FROM `students` ' +
        'WHERE id = ?', [id]);
  }

  /**
   * Updates a student
   *
   * @param id Student's id
   * @param student Student's details to be updated
   * @return {Promise}
   */
  static update(id, student) {
    return db.execute('UPDATE `students` ' +
        'SET `firstname` = ?, `lastname` = ?, `grade` = ?, `birth_date` = ? ' +
        'WHERE `id` = ?',
        [student.firstName, student.lastName, student.grade, student.birthDate, id]);
  }

  /**
   * Deletes a student
   *
   * @param id Student's id
   * @return {Promise}
   */
  static deleteById(id) {
    return db.execute('DELETE FROM `students` WHERE `id` = ?', [id]);
  }

  /**
   * Returns the student ajv validation schema
   *
   * @return {object}
   */
  static getValidationSchema() {
    return {
      $id: 'stSchema',
      type: 'object',
      minProperties: 4,
      required: ['firstName', 'lastName', 'grade', 'birthDate'],
      properties: {
        firstName: {type: 'string'},
        lastName: {type: 'string'},
        grade: {type: 'number', minimum: 0, maximum: 20},
        birthDate: {type: 'string', format: 'date'}
      }
    };
  }
};