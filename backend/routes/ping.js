import { createClient } from "@supabase/supabase-js";

const supabase= createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

export default async function handler(req, res) {
  const data = await supabase.from("tasks").select("title").limit(1);
  res.status(200).json({status:`pong ${data.data[0].title}`});
}