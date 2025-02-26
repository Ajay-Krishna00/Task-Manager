import { supabase } from "../utils/supabaseClient.js";

const uploadProfileImage = async (file, name) => {
  const name = req.body.name;
  const fileName = name;

  const { data, error } = await supabase.storage
    .from("Images")
    .upload(`profiles/${fileName}`, file, {
      contentType: image.png,
    });

  if (error) {
    console.error("Error uploading image:", error);
    return;
  }

  const { publicURL, error: urlError } = supabase.storage
    .from("Images")
    .getPublicUrl(`profiles/${fileName}`);

  if (urlError) {
    console.error("Error getting public URL:", urlError);
    return;
  }

  console.log("Profile image uploaded successfully:", publicURL);
  return publicURL;
};

export default uploadProfileImage;
