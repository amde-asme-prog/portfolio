import { supabase } from "../config/supabaseConfig";

export const fetchServices = async () => {
  const response = await supabase.from("services").select("*");
  return response.data;
};

export const addService = async (service) => {
  const response = await supabase.from("services").insert(service);
  return response.data;
};

export const updateService = async ({ id, updatedService }) => {
  const response = await supabase
    .from("services")
    .update(updatedService)
    .eq("id", id);
  return response.data;
};

export const deleteService = async (id) => {
  await supabase.from("services").delete().eq("id", id);
};
