import supabase from "@/lib/supabase";
import { Pricing } from "../../../../types/collection";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { data, error } = await supabase
    .from("pricing")
    .select("*")
    .returns<Pricing[]>();
  if (error || !data) {
    return { status: 500, body: { error: "Error occured" } };
  }

  return NextResponse.json(data, { status: 200 });
}
