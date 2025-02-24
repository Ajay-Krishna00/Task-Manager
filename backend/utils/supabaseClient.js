// utils/supabaseClient.js
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();
// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL; // Ensure this is correct
const supabaseKey = process.env.SUPABASE_ANON_KEY; // Ensure this is correct

if (!supabaseUrl || !supabaseKey) {
  throw new Error(
    "Supabase URL and Anon Key must be provided in the .env file",
  );
}

export const supabase = createClient(supabaseUrl, supabaseKey);
