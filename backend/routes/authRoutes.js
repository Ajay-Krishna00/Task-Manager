import express from "express";
import { supabase } from "../utils/supabaseClient.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

// Signup route
router.post(
  "/signup",
  //[body("email").isEmail(), body("password").isLength({ min: 6 })],
  async (req, res) => {
    // const errors = validationResult(req);
    // if (!errors.isEmpty())
    //   return res.status(400).json({ errors: errors.array() });

    const { email, password, name, profile_Img } = req.body;

    try {
      // Sign up the user with Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (authError) {
        if (
          authError.message.includes(
            "duplicate key value violates unique constraint",
          ) ||
          authError.message.includes(
            "insert or update on table violates foreign key constraint",
          )
        ) {
          return res.status(400).json({ error: "Email already exists" });
        }
        return res.status(400).json({ error: authError.message });
      }

      //Insert additional user data into a custom table
      const { data: userData, error: userError } = await supabase
        .from("users") // Custom table for additional user data
        .insert([
          {
            id: authData.user.id, // Link to the auth user
            name,
            profile_Img,
          },
        ]);

      if (userError) {
        if (
          userError.message.includes(
            "duplicate key value violates unique constraint",
          )
        ) {
          return res.status(400).json({ error: "Email already exists" });
        }
        return res.status(400).json({ error: userError.message });
      }

      // Return success response
      res.json({
        message: "User signed up successfully!",
        user: authData.user,
      });
    } catch (error) {
      console.error("Error during signup:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
);

// Login route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Step 1: Sign in the user with Supabase Auth
    const { data: authData, error: authError } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });
    if (authError) {
      if (authError.message.includes("Email not confirmed")) {
        return res.status(400).json({
          error:
            "Email not confirmed. Please check your inbox for a confirmation email.",
        });
      }
      return res
        .status(400)
        .json({ error: `Invalid email or password: ${authError.message}` });
    }

    // Step 2: Fetch additional user data from the custom table (optional)
    const { data: userData, error: userError } = await supabase
      .from("users")
      .select("*")
      .eq("id", authData.user.id)
      .single();

    if (userError) {
      return res
        .status(400)
        .json({ error: `Failed to fetch user data: ${userError.message}` });
    }

    // Step 3: Generate JWT token
    // const token = jwt.sign({ id: authData.user.id }, process.env.JWT_SECRET, {
    //   expiresIn: "1h",
    // });
    const token = authData.session.access_token;
    // Step 4: Return success response
    res.json({
      token,
      user: {
        id: authData.user.id,
        email: authData.user.email,
        name: userData?.name,
        profile_Img: userData?.profile_Img,
      },
    });
  } catch (error) {
    console.error("Error during login:", error);
    res
      .status(500)
      .json({ error: `Internal server error in authRoutes: ${error}` });
  }
});

// Logout Route
router.post("/logout", async (req, res) => {
  try {
    const { error } = await supabase.auth.signOut();

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    res.status(500).json({ error: `Internal server error: ${error}` });
  }
});

export default router;
