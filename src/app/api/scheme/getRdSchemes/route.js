import { NextResponse } from "next/server";
import connect from "@/db";
import RdScheme from "@/models/rdScheme";

connect();

export async function GET() {
  return RdScheme.find().then(
    (schemes) => {
      return NextResponse.json({schemes});
    },
    (error) => {
      return NextResponse.json({ error });
    }
  );
}
