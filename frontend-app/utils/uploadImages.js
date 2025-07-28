import { supabase } from "./supabase";

export async function uploadImage(file, fileName) {
  if (!file) throw new Error("No file provided");

  const { data, error } = await supabase.storage
    .from("teaching-heart-bucket")
    .upload(fileName, file);

  if (error) {
    console.error("Upload failed:", error.message);
    throw error;
  }

  const { publicUrl } = supabase.storage
    .from("teaching-heart-bucket")
    .getPublicUrl(fileName).data;

  if (!publicUrl) {
    throw new Error("Failed to get public URL");
  }

  return publicUrl;
}
