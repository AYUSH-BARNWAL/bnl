import { NextResponse } from "next/server";
import connect from "@/db";
import FdScheme from "@/models/fdScheme";
connect();

export async function GET() {
  return FdScheme.find().then(
    (schemes) => {
      return NextResponse.json({schemes});
    },
    (error) => {
      return NextResponse.json({ error });
    }
  );
}
