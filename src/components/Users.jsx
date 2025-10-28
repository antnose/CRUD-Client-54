import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await axios.get("http://localhost:3001/users");
      setUsers(data.data);
    };
    fetchData();
  }, []);

  const handleUser = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const newUser = { name, email };

    fetch(`http://localhost:3001/users`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newUser),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("After saving data", data);
        if (data.insertedId) {
          alert("Users added successfully");
          newUser._id = data.insertedId;
          setUsers([...users, newUser]);
          e.target.reset();
          console.log(data);
        }
      });
  };

  return (
    <div>
      <form
        onSubmit={handleUser}
        className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-lg space-y-6"
      >
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Full Name
          </label>
          <input
            type="text"
            name="name"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            placeholder="Enter your full name"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            placeholder="Enter your email"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
        >
          Add User
        </button>
      </form>

      <div className="text-center mt-10 pt-10">
        {users.map((user) => (
          <p
            key={user?._id}
            className="text-2xl font-semibold py-2 my-4 border-amber-400 border w-11/12 mx-auto"
          >
            {user.name} : {user?.email}
          </p>
        ))}
      </div>
    </div>
  );
};

export default Users;
