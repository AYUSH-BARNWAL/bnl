import { NextRequest, NextResponse } from "next/server";
import { connect } from "../../../../dbConfig/dbConfig";
import Member from "../../../../models/memberModel";

connect();

export async function POST(request) {
  const member = await request.json();
  return Member.create(member).then(
    (doc) => {
      return NextResponse.json({ doc });
    },
    (error) => {
      return NextResponse.json({ error });
    }
  );
}
