import { NextRequest, NextResponse } from "next/server";
import { connect } from "../../../../dbConfig/dbConfig";
import Member from "../../../../models/memberModel";

connect();

export async function POST(request) {
  try {
    const member = await request.json();
    await Member.create(member);
    return NextResponse.json({
      success: true,
      message: "Member created successfully",
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: error.message,
      },
      {
        status: 400,
      }
    );
  }
}
