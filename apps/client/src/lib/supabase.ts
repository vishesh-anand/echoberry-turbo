import { createClient } from "@supabase/supabase-js";
import { config } from "./config";

export const supabase = createClient(
  config.supabase.url,
  config.supabase.anonKey
);

// Example function to fetch data
export async function fetchData() {
  const { data, error } = await supabase.from("your_table").select("*");

  if (error) {
    console.error("Error fetching data:", error);
    return null;
  }

  return data;
}

// Example function to insert data
export async function insertData(newData: any) {
  const { data, error } = await supabase
    .from("your_table")
    .insert(newData)
    .select();

  if (error) {
    console.error("Error inserting data:", error);
    return null;
  }

  return data;
}
