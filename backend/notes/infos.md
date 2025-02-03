# Create Your Backend Project

## Open a terminal and run:

    ``` bash
    mkdir task-manager-backend
    cd task-manager-backend
    npm init -y
    ```

<!-- npm init -y command is used to quickly create a package.json file for your Node.js project with default values.  -->

This creates a package.json file.

## Install Express.js:

`npm install express cors dotenv`

express: API framework.
cors: Enables frontend-backend communication. A package for enabling Cross-Origin Resource Sharing (CORS).
dotenv: Loads environment variables (like API keys). A package for loading environment variables from a .env file.

## 3. Setup Supabase

### Step 3: Create a Supabase Project

Go to Supabase and sign up.
Create a new project.
Copy your Project URL and Anon Key (needed for connecting the backend).

### Step 4: Setup Database Tables

Inside your Supabase project, go to Table Editor.
Create a table named tasks with these columns:
id → uuid (Primary key, default: gen_random_uuid())
title → text
description → text
status → text (default: "pending")
created_at → timestamp (default: now())

## 4. Connect Express.js to Supabase

### Step 5: Install Supabase Client

`npm install @supabase/supabase-js`

### Step 6: Create server.js

Inside your task-manager-backend folder, create server.js and add:

```javascript
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { createClient } = require("@supabase/supabase-js");

const app = express();
app.use(express.json());
app.use(cors());

// Connect to Supabase
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY,
);

// Test Route
app.get("/", (req, res) => {
  res.send("Task Manager API is running!");
});

// Create a Task
app.post("/tasks", async (req, res) => {
  const { title, description, status } = req.body;
  const { data, error } = await supabase
    .from("tasks")
    .insert([{ title, description, status }]);

  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
});

// Get All Tasks
app.get("/tasks", async (req, res) => {
  const { data, error } = await supabase.from("tasks").select("*");
  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
```

## 5. Setup Environment Variables

### Step 7: Create a .env File

Inside the project, create a .env file and paste:

```env
SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key
PORT=5000
```

Replace the values with the actual Supabase URL and Anon Key from your project.

## 6. Run the Backend

### Step 8: Start the Server

In the terminal, run:

`node server.js`
If everything is set up correctly, you should see:

`Server running on port 5000`

### Step 9: Test API Using Postman or Browser

Open http://localhost:5000/tasks in the browser → Should return an empty array [] (if no tasks exist).
Use Postman or any API tool to send a POST request to http://localhost:5000/tasks with:

```json
{
  "title": "Learn Express",
  "description": "Build a backend using Express.js",
  "status": "in-progress"
}
```

This should create a task and return the saved task.

## 7. Connect React Frontend to Backend

### Step 10: Fetch Tasks in React

Modify your React project (TaskManager.jsx or similar):

```javascript
import { useEffect, useState } from "react";

const API_URL = "http://localhost:5000/tasks";

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setTasks(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h2>Task Manager</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.title} - {task.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskManager;
```

### Step 11: Run Frontend & Test

Start the frontend:

`npm start`
You should see the tasks fetched from the backend!
