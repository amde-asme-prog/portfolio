import { supabase } from "../config/supabaseConfig";

export const fetchSkills = async () => {
  const response = await supabase.from("skills").select("*");
  return response.data;
};

export const addSkill = async (skill) => {
  const response = await supabase.from("skills").insert(skill);
  return response.data;
};

export const updateSkill = async ({ id, updatedSkill }) => {
  const response = await supabase
    .from("skills")
    .update(updatedSkill)
    .eq("id", id);
  return response.data;
};

export const deleteSkill = async (id) => {
  await supabase.from("skills").delete().eq("id", id);
};
