import { NextRequest, NextResponse } from "next/server";
import { connect } from "../../../../dbConfig/dbConfig";
import Membership from "../../../../models/membershipModel";

connect();

export async function POST(req) {
  try {
    const reqBody = await req.json();
    const newMembership = await Membership.create(reqBody);
    return NextResponse.json({
      success: true,
      message: "Membership created successfully",
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        error: error.message,
      },
      { status: 500 }
    );
  }
}
