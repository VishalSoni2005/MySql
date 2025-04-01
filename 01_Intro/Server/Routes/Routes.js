const { getSubscription, getSubscriptedUsers } = require('../Models/subscriptions.model');
const { createUser, getUsers, updateUser, deleteUser } = require('../Models/User.model');
const app = require('express').Router();

// users table
app.post('/users', (req, res) => {
  const { name, email, phone, password, role = 'member', join_date = new Date() } = req.body;
  createUser(name, email, phone, password, (err, result) => {
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
  const { name, email, password, phone, join_date = new Date(), role = 'member' } = req.body;

  updateUser(id, name, email, password, phone, join_date, role, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'User updated!' });
  });
});

// app.delete('/users/:id', (req, res) => {
//   const { id } = req.params;
//   deleteUser(id, (err, result) => {
//     if (err) return res.status(500).json({ error: err.message });
//     res.json({ message: 'User deleted!' });
//   });
// });

//! subscriptios table

app.get('/getsubscribedUsers', (req, res) => {
  getSubscriptedUsers((err, result) => {
    if(err) return res.status(500).json({ error: err.message });
    res.json(result);
  })
})

app.post('/getSubscriptions', (req, res) => {
  const { user_id, membership_id, start_date = new Date() } = req.body;
  getSubscription(user_id, membership_id, start_date, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(500).json( { message: "Sucess", data: result})
  });
});

module.exports = app;
