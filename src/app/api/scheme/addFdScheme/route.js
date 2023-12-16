import { connect } from "@/dbConfig/dbConfig";
import { NextResponse } from "next/server";
import FdScheme from "@/models/fdScheme";

connect();

export async function POST(request) {
  try {
    const scheme = await request.json();
    await FdScheme.create(scheme);
    return NextResponse.json({
      success: true,
      message: "Scheme created successfully",
    });
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      {
        error: e.message,
      },
      {
        status: 500,
      }
    );
  }
}
