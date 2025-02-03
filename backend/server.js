require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { createClient } = require("@supabase/supabase-js");

const authMiddleware = require("./authMiddleware");
const authRoutes = require("./authRoutes");

const app = express();
app.use(express.json());
app.use(cors());

app.use("/auth", authRoutes);

// Connect to Supabase
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY,
);

// Test Route
// app.get("/", (req, res) => {
//   res.send("Task Manager API is running!");
// });

// Create a Task

app.post("/tasks", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const {
      title,
      description,
      dueDate,
      priority,
      isCompleted = false,
      completedDate = null,
    } = req.body;

    const { data, error } = await supabase
      .from("tasks")
      .insert([
        {
          user_id: userId,
          title,
          description,
          due_date: dueDate,
          priority: priority,
          is_completed: isCompleted,
          completed_date: completedDate,
        },
      ])
      .select();

    if (error) throw error;

    res.status(201).json({
      message: "Task created successfully",
      task: data[0],
    });
  } catch (error) {
    res.status(500).json({
      error: "Failed to create task",
      details: error.message,
    });
  }
});

// Get All Tasks
app.get("/tasks", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const { data, error } = await supabase
      .from("tasks")
      .select("*")
      .eq("user_id", userId)
      .order("due_date", { ascending: true });

    if (error) throw error;

    res.json({
      message: "Tasks retrieved successfully",
      tasks: data,
    });
  } catch (error) {
    res.status(500).json({
      error: "Failed to retrieve tasks",
      details: error.message,
    });
  }
});

app.delete("/tasks/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    // First verify the task belongs to the user
    const { data: task } = await supabase
      .from("tasks")
      .select("user_id")
      .eq("id", id)
      .single();

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    if (task.user_id !== userId) {
      return res
        .status(403)
        .json({ error: "Unauthorized to delete this task" });
    }

    const { error } = await supabase.from("tasks").delete().eq("id", id);

    if (error) throw error;

    res.json({
      message: "Task deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      error: "Failed to delete task",
      details: error.message,
    });
  }
});

// Update a Task
app.put("/tasks/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const {
      title,
      description,
      dueDate,
      priority,
      isCompleted,
      completedDate,
    } = req.body;

    // First verify the task belongs to the user
    const { data: task } = await supabase
      .from("tasks")
      .select("user_id")
      .eq("id", id)
      .single();

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    if (task.user_id !== userId) {
      return res
        .status(403)
        .json({ error: "Unauthorized to update this task" });
    }

    const { data, error } = await supabase
      .from("tasks")
      .update({
        title,
        description,
        due_date: dueDate,
        priority: priority,
        is_completed: isCompleted,
        completed_date: completedDate,
      })
      .eq("id", id)
      .select();

    if (error) throw error;

    res.json({
      message: "Task updated successfully",
      task: data[0],
    });
  } catch (error) {
    res.status(500).json({
      error: "Failed to update task",
      details: error.message,
    });
  }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
