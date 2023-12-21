import { NextRequest, NextResponse } from "next/server";
import { connect } from "../../../../dbConfig/dbConfig";
import Member from "../../../../models/memberModel";

connect();

export async function POST(request) {
  try {
    const { membershipNumber } = await request.json();

    if (membershipNumber) {
      const matchingMembers = await Member.find({
        membershipNumber: membershipNumber,
      });

      return NextResponse.json(matchingMembers, { status: 200 });
    } else {
      return NextResponse.json(
        { error: "Invalid query parameters" },
        { status: 400 }
      );
    }
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
