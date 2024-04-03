import { Database } from "./supabase";

export type Orders = Database["public"]["Tables"]["orders"]["Row"];
export type Pricing = Database["public"]["Tables"]["pricing"]["Row"];
export type Images = Database["public"]["Tables"]["images"]["Row"];
