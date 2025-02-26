import express from "express";
import { supabase } from "../utils/supabaseClient.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Middleware to protect routes (ensure user is authenticated)
router.use(authMiddleware);

// Create a Task
router.post("/tasks", async (req, res) => {
  const {
    title,
    description,
    dueDate,
    priority,
    isCompleted = false,
    completedDate = null,
  } = req.body;
  const userId = req.user.id; // User ID from authMiddleware

  try {
    const { data, error } = await supabase
      .from("tasks")
      .insert([
        {
          user_id: userId,
          title,
          description,
          dueDate: dueDate,
          priority,
          isCompleted: isCompleted,
          completedDate: completedDate,
        },
      ])
      .select();

    if (error) {
      return res.status(400).json({ error: error });
    }

    // Return the created task
    res
      .status(201)
      .json({ message: "Task created successfully", task: data[0] });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get All Tasks
router.get("/tasks", async (req, res) => {
  const userId = req.user.id; // User ID from authMiddleware

  try {
    // Fetch tasks for the logged-in user
    const { data, error } = await supabase
      .from("tasks")
      .select("*")
      .eq("user_id", userId);

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.json({ message: "Tasks fetched successfully", tasks: data });
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
});

// Delete a Task
router.delete("/tasks/:id", async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id; // User ID from authMiddleware

  try {
    // Delete the task if it belongs to the user
    const { error } = await supabase
      .from("tasks")
      .delete()
      .eq("id", id)
      .eq("user_id", userId);

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    // Return success message
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get User
router.get("/users", async (req, res) => {
  try {
    const userId = req.user.id; // User ID from authMiddleware

    if (!userId) {
      return res.status(401).json({ error: "User is not logged in" });
    }

    const { data: userData, error: userError } = await supabase
      .from("users")
      .select("*")
      .eq("id", userId)
      .single(); // Ensure to fetch a single user

    if (userError) {
      console.error("Error fetching user:", userError.message);
      return res
        .status(400)
        .json({ error: `Failed to retrieve user: ${userError.message}` });
    }

    res.json({
      message: "User retrieved successfully",
      user: userData,
    });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: `Internal error: ${error.message}` });
  }
});

// Update a Task
router.put("/tasks/:id", async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;
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
        dueDate: dueDate,
        priority: priority,
        isCompleted: isCompleted,
        completedDate: completedDate,
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

export default router;
