import React, { useEffect, useState } from "react";
import axios from "axios";
import "./allusers.css";
const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const backendUrl = "http://localhost:4000"; // Apna backend URL check karein
  const aToken = localStorage.getItem("aToken"); // Token ka naam check karein

  const fetchAllUsers = async () => {
    try {
      console.log("Fetching users..."); // Debugging
      const { data } = await axios.get(backendUrl + "/api/admin/all-users", {
        headers: { aToken },
      });

      console.log("Data received:", data); // Check karein data aa raha hai ya nahi

      if (data.success) {
        setUsers(data.users);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("API Error:", error);
      alert("Error fetching users");
    }
  };

  useEffect(() => {
    if (aToken) {
      fetchAllUsers();
    }
  }, [aToken]);

  return (
    <div className="admin-users-list" style={{ padding: "20px" }}>
      <h2>All Users ({users.length})</h2>
      <table
        border="1"
        style={{ width: "100%", marginTop: "20px", borderCollapse: "collapse" }}
      >
        <thead>
          <tr style={{ background: "#eee" }}>
            <th>Image</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((item, index) => (
              <tr key={index}>
                <td>
                  <img src={item.image} width="40" alt="" />
                </td>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.phone}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" style={{ textAlign: "center" }}>
                No users found or loading...
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AllUsers;
