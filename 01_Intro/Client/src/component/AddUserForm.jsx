import { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

const AddUserForm = ({ refreshUsers }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:3000/users', {
        name,
        email,
        age: Number(age),
      });

      setName('');
      setEmail('');
      setAge('');
      refreshUsers();
    } catch (error) {
      console.log('Error creating user:', error);
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-2xl shadow-lg flex flex-col gap-4 w-full max-w-md"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-xl font-bold text-center text-gray-700">Add New User</h2>

      <input
        type="text"
        placeholder="Enter Name"
        value={name}
        onChange={e => setName(e.target.value)}
        required
        className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-400"
      />
      <input
        type="email"
        placeholder="Enter Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
        className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-400"
      />
      <input
        type="number"
        placeholder="Enter Age"
        value={age}
        onChange={e => setAge(e.target.value)}
        required
        className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-400"
      />

      <motion.button
        type="submit"
        className="bg-blue-500 text-white font-bold py-2 rounded-lg hover:bg-blue-600"
        whileTap={{ scale: 0.95 }}
      >
        Add User
      </motion.button>
    </motion.form>
  );
};

export default AddUserForm;
