import { useState } from 'react';
import axios from 'axios';

function App() {
  const [name, setName] = useState('');
  const [users, setUsers] = useState([]);

  const CheckUser = async () => {
    try {
      const response = await axios.get('http://localhost:3000/users');
      const userArray = response.data;

      const userExists = userArray.some(user => user.name === name);

      if (userExists) {
        console.log('User found:', name);
      } else {
        console.log('User not found');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getAllUsers = async () => {
    try {
      const response = await axios.get('http://localhost:3000/users');
      setUsers(response.data);
      setName('');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center transition transform ease-in-out duration-500">
      <div className="flex flex-col">
        <input
          className="border-3 rounded-full font-bold border-pink-500 solid p-3 m-3"
          type="text"
          placeholder="Enter name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <button onClick={CheckUser} className="bg-pink-500 p-3 m-3 rounded-full w-[150px] translate-x-8">
          Search User
        </button>
        <button onClick={getAllUsers} className="bg-pink-500 p-3 m-3 rounded-full w-[150px] translate-x-8">
          Get all Users
        </button>
      </div>

      {users.length > 0 && (
        <div className="h-[100px] overflow-y-scroll w-[200px] border-3 p-3 m-3 rounded-lg">
          <ol>
            {users.map(user => (
              <li key={user.id}>{user.name}</li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}

export default App;
