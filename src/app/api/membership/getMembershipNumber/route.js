import { NextRequest, NextResponse } from "next/server";
import { connect } from "../../../../dbConfig/dbConfig";
import Membership from "../../../../models/membershipModel";

connect();

export async function GET(req) {
  try {
    const lastMember = await Membership.findOne().sort({
      membershipNumber: -1,
    });
    if (lastMember) {
      return NextResponse.json(
        { membershipNumber: lastMember.membershipNumber },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { message: "No membership records found." },
        { status: 404 }
      );
    }
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
