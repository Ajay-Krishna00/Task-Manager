// src/utils/api.js
import axios from "axios";

const API_URL =  "http://localhost:5000";

// Sign up a new user
export const signUp = async (email, password, name, profile_Img) => {
  const response = await axios.post(`${API_URL}/auth/signup`, {
    email,
    password,
    name,
    profile_Img,
  });
  return response.data;
};

// Log in an existing user
export const login = async (email, password) => {
  const response = await axios.post(`${API_URL}/auth/login`, {
    email,
    password,
  });
  return response.data;
};

// Log out the current user
export const logout = async () => {
  const response = await axios.post(`${API_URL}/auth/logout`);
  return response.data;
};

// Fetch all
export const fetchTasks = async () => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.get(`${API_URL}/tasks`, {
      headers: { Authorization: `Bearer ${token}` }, // Send the token in the header
    });
    // console.log("Tasks fetched successfully:", response.data);
    return { data: response.data };
  } catch (error) {
    throw error;
  }
};

export const fetchUser = async () => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.get(`${API_URL}/users`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return { userInfos: response.data, error: null };
  } catch (error) {
    console.log("Error fetching user:", error.response?.data);
    return { userInfos: { user: "" }, error: error.response?.data };
  }
};

// Create a new task
export const createTask = async (task) => {
  const token = localStorage.getItem("token");
  const response = await axios.post(`${API_URL}/tasks`, task, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// Delete a task
export const deleteTask = async (id) => {
  const token = localStorage.getItem("token");
  const response = await axios.delete(`${API_URL}/tasks/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// Update a task
export const updateTask = async (editTask) => {
  const token = localStorage.getItem("token");
  const response = await axios.put(
    `${API_URL}/tasks/${editTask.id}`,
    editTask,
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  );
  return { data: response.data };
};
