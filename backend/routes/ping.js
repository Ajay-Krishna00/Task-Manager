import { createClient } from "@supabase/supabase-js";

const supabase= createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

export default async function handler(req, res) {
  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    return res.status(204).end();
  }
  const data = await supabase.from("tasks").select("title").limit(1);
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.status(200).json({ status: `ponged: ${data.data[0].title}` });
  console.log("Pinged:", data.data[0].title);
}