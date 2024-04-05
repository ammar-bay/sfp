import supabase from "@/lib/supabase";
import { Pricing } from "../../../../types/collection";

export async function GET(request: Request) {
  const { data, error } = await supabase
    .from("pricing")
    .select("*")
    .returns<Pricing[]>();
  if (error || !data) {
    return Response.json({ error: "Error occured" }, { status: 500 });
  }

  return Response.json(data, { status: 200 });
}
