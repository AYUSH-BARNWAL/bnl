import { NextResponse } from "next/server";
import connect from "@/db";
import SaScheme from "@/models/saScheme";

connect();

export async function GET() {
  return SaScheme.find().then(
    (schemes) => {
      return NextResponse.json({ schemes });
    },
    (error) => {
      return NextResponse.json({ error });
    }
  );
}
