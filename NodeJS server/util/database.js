const mysql = require('mysql2');

/**
 * Database connection pool
 *
 * @type {Pool}
 */
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'cmit',
  password: 'giaxarantan'
});

module.exports = pool.promise();