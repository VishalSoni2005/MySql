const { createUser, getUsers, updateUser, deleteUser } = require('../Models/User.model');
const app = require('express').Router();

app.post('/users', (req, res) => {
  const { name, email, age } = req.body;
  createUser(name, email, age, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: 'User added!', userId: result.insertId });
  });
});

app.get('/users', (req, res) => {
  getUsers((err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

app.put('/users/:id', (req, res) => {
  const { id } = req.params;
  const { name, email, age } = req.body;
  updateUser(id, name, email, age, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'User updated!' });
  });
});

app.delete('/users/:id', (req, res) => {
  const { id } = req.params;
  deleteUser(id, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'User deleted!' });
  });
});

module.exports = app;
