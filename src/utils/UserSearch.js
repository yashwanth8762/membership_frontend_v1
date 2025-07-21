import React, { useState, useCallback } from "react";
import axios from "axios";
import { debounce } from "lodash";
import "../../src/UserSearch.css";
import { API_BASE_URL } from "../config";
import { useSelector } from "react-redux";
const UserSearch = () => {
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState([]);
  const user = useSelector((state) => state.user.value);

  const config = {
    headers: {
      Authorization: user.access_token,
    },
  };

  // Debounced function to avoid sending too many API requests
  const fetchUsers = useCallback(
    debounce(async (query) => {
      if (query.trim() === "") {
        setUsers([]);
        return;
      }

      try {
        const response = await axios.get(
          `${API_BASE_URL}user/search?query=${query}`,config
        );
        setUsers(response.data);
        console.log(response.data)
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    }, 500), // Delay in ms (500ms)
    []
  );

  // Handle input change
  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    fetchUsers(value); // Trigger the search whenever input changes
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search for users"
      />

      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.first_name} {user.last_name} - {user.email_data?.email_id}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserSearch;
