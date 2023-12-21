import { NextRequest, NextResponse } from "next/server";
import { connect } from "../../../../dbConfig/dbConfig";
import cash from "../../../../models/cashModel";

connect();

export async function POST(request) {
  try {
    const cashi = await request.json();
    await cash.create(cashi);
    return NextResponse.json({
      success: true,
      message: "Cash added successfully",
    });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}
