import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { Trash2 } from 'lucide-react';
import { useState } from 'react';

const UserList = ({ users, refreshUsers }) => {
  const [loadingId, setLoadingId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 4;

  // Pagination logic
  const totalPages = Math.ceil(users.length / usersPerPage);
  const startIndex = (currentPage - 1) * usersPerPage;
  const visibleUsers = users.slice(startIndex, startIndex + usersPerPage);

  const handleDelete = async id => {
    setLoadingId(id); // Show loading effect for the deleted user

    try {
      await axios.delete(`http://localhost:3000/users/${id}`);
      refreshUsers(); // Refresh user list after deletion
    } catch (error) {
      console.log('Error deleting user:', error);
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <motion.div
      className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-lg mx-auto 
                 min-h-[300px] max-h-[450px] flex flex-col"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-xl font-bold text-center text-gray-700 mb-3">User List</h2>

      {/* User List */}
      <div className="flex-grow overflow-x-hidden overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300">
        {users.length > 0 ? (
          <ul className="space-y-3">
            <AnimatePresence>
              {visibleUsers.map(user => (
                <motion.li
                  key={user.id}
                  className="flex items-center justify-between p-3 bg-gray-100 
                             rounded-lg shadow-md hover:shadow-lg transition cursor-pointer"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex flex-col">
                    <span className="font-semibold text-gray-800">{user.name}</span>
                    <span className="text-gray-500 text-sm">{user.email}</span>
                    <span className="text-gray-400 text-xs">Age: {user.age}</span>
                  </div>

                  <motion.button
                    onClick={() => handleDelete(user.id)}
                    className="text-red-500 p-2 rounded-full hover:bg-red-100 transition flex items-center"
                    whileTap={{ scale: 0.8 }}
                    disabled={loadingId === user.id}
                  >
                    {loadingId === user.id ? (
                      <span className="animate-spin w-5 h-5 border-2 border-red-500 border-t-transparent rounded-full"></span>
                    ) : (
                      <Trash2 className="w-5 h-5" />
                    )}
                  </motion.button>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        ) : (
          <p className="text-center text-gray-500 mt-4">No users found.</p>
        )}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-between mt-4">
        <button
          className={`px-3 py-2 text-sm font-semibold rounded-md transition-all 
                      ${currentPage === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>

        <span className="text-gray-600 text-sm">
          Page {currentPage} of {totalPages}
        </span>

        <button
          className={`px-3 py-2 text-sm font-semibold rounded-md transition-all 
                      ${currentPage === totalPages ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </motion.div>
  );
};

export default UserList;
