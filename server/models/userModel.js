const { pool } = require('./db/index')

const user = {
  findOne: async (username, cb) => {
    const fUser = await pool.query('SELECT * FROM Users WHERE email = $1', [
      username.username,
    ])
    cb(null, fUser)
  },
  findById: async (id, cb) => {
    const fUser = await pool.query('SELECT * FROM Users WHERE id = $1', [id])
    cb(null, fUser)
  },
  insert: async (username, hashPass, salt) => {
    const newUser = await pool.query(
      'INSERT INTO Users (email, hash, password_salt, date_created, employer_enabled) VALUES ($1, $2, $3, $4, $5)',
      [username, hashPass, salt, 'NOW()', false]
    )
  },
  uploadPDF: async (url, fileUse, id) => {
    return pool.query(
      `UPDATE Users SET ${fileUse}_url = $1
      WHERE id=$2;`,
      [url, id]
    )
  },
  getPDF: (fileUse, id) => {
    return pool.query(`SELECT ${fileUse}_url FROM Users WHERE id=$1`, [id])
  },
}

module.exports = user
