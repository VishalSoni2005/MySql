import { useState, useEffect } from 'react';
import axios from 'axios';
import AddUserForm from './component/AddUserForm';
import UserList from './component/UserList';

function App() {
  const [users, setUsers] = useState([]);

  const getAllUsers = async () => {
    try {
      const response = await axios.get('http://localhost:3000/users');
      setUsers(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gradient-to-r from-black  to-gray-800 p-6">
      <AddUserForm refreshUsers={getAllUsers} />
      <UserList users={users} />
    </div>
  );
}

export default App;

// import { useState } from 'react';
// import axios from 'axios';

// function App() {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [age, setAge] = useState('');
//   const [users, setUsers] = useState([]);

//   const handleSubmit = async e => {
//     e.preventDefault();

//     try {
//       const response = await axios.post('http://localhost:3000/users', {
//         name,
//         email,
//         age: Number(age),
//       });

//       console.log('User created:', response.data);
//       setName('');
//       setEmail('');
//       setAge('');
//       getAllUsers(); // Refresh user list
//     } catch (error) {
//       console.log('Error creating user:', error);
//     }
//   };

//   const getAllUsers = async () => {
//     try {
//       const response = await axios.get('http://localhost:3000/users');
//       setUsers(response.data);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   return (
//     <div className="h-screen w-screen flex flex-col items-center justify-center transition transform ease-in-out duration-500">
//       {/* Form to Add User */}
//       <form onSubmit={handleSubmit} className="flex flex-col items-center">
//         <input
//           className="border-3 rounded-full font-bold border-pink-500 solid p-3 m-3"
//           type="text"
//           placeholder="Enter name"
//           value={name}
//           onChange={e => setName(e.target.value)}
//           required
//         />
//         <input
//           className="border-3 rounded-full font-bold border-pink-500 solid p-3 m-3"
//           type="email"
//           placeholder="Enter email"
//           value={email}
//           onChange={e => setEmail(e.target.value)}
//           required
//         />
//         <input
//           className="border-3 rounded-full font-bold border-pink-500 solid p-3 m-3"
//           type="number"
//           placeholder="Enter age"
//           value={age}
//           onChange={e => setAge(e.target.value)}
//           required
//         />
//         <button type="submit" className="bg-green-500 p-3 m-3 rounded-full w-[150px]">
//           Add User
//         </button>
//       </form>

//       {/* Button to Get All Users */}
//       <button onClick={getAllUsers} className="bg-blue-500 p-3 m-3 rounded-full w-[150px]">
//         Get all Users
//       </button>

//       {/* Display Users */}
//       {users.length > 0 && (
//         <div className="h-[200px] overflow-y-scroll w-[300px] border-3 p-3 m-3 rounded-lg">
//           <ol>
//             {users.map(user => (
//               <li key={user.id}>
//                 {user.name} - {user.email} - {user.age}
//               </li>
//             ))}
//           </ol>
//         </div>
//       )}
//     </div>
//   );
// }

// export default App;
