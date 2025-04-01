const connection = require('../Config/db');
const bcrypt = require('bcryptjs');

const createUser = async (name, email, phone, password, callback) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const sql = `INSERT INTO users (name, email, phone, password) VALUES (?, ?, ?, ?)`;
    connection.query(sql, [name, email, phone, hashedPassword], callback);
  } catch (error) {
    callback(error, null);
    console.log(error);
  }
};

const getUsers = callback => {
  connection.query('SELECT * FROM users', callback);
};

//* update the user
const updateUser = (id, name, email, age, callback) => {
  const sql = `UPDATE users SET name = ?, email = ?, age = ? WHERE id = ?`;
  connection.query(sql, [name, email, age, id], callback);
};

// //* delete from the database
// const deleteUser = (id, callback) => {
//   connection.query('DELETE FROM users WHERE id = ?', [id], callback);
// };

module.exports = {
  createUser,
  getUsers,
  updateUser, 
  // deleteUser,
};
