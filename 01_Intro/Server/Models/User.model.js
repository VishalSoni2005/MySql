const connection = require('../Config/db');

//* fn to create a new user
const createUser = (name, email, age, callback) => {
  const sql = `INSERT INTO users (name, email, age) VALUES (?, ?, ?)`;
  connection.query(sql, [name, email, age], callback);
};

const getUsers = callback => {
  connection.query('SELECT * FROM users', callback);
};

//* update the user
const updateUser = (id, name, email, age, callback) => {
  const sql = `UPDATE users SET name = ?, email = ?, age = ? WHERE id = ?`;
  connection.query(sql, [name, email, age, id], callback);
};

//* delete from the database
const deleteUser = (id, callback) => {
  connection.query('DELETE FROM users WHERE id = ?', [id], callback);
};

module.exports = {
  createUser,
  getUsers,
  updateUser,
  deleteUser,
};
