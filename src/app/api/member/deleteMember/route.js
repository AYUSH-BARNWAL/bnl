import { connect } from "@/dbConfig/dbConfig";
import Member from "@/models/memberModel";
import { NextResponse } from "next/server";

connect();
export async function POST(request) {
  const body = await request.json();
  const { _id } = body;
  return Member.deleteOne({ _id }).then(
    () => {
      return NextResponse.json({ success: true });
    },
    () => {
      return NextResponse.json({ error: "Unable to delete member" });
    }
  );
}
