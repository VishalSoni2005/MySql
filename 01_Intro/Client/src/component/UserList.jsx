import { motion } from 'framer-motion';

const UserList = ({ users }) => {
  return (
    <motion.div
      className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md mt-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-xl font-bold text-center text-gray-700">User List</h2>
      {users.length > 0 ? (
        <ul className="mt-3 space-y-2">
          {users.map(user => (
            <li key={user.id} className="p-2 bg-gray-100 rounded-lg">
              <span className="font-semibold">{user.name}</span> - {user.email} - {user.age}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-500">No users found.</p>
      )}
    </motion.div>
  );
};

export default UserList;
