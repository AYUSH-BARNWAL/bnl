import { NextRequest, NextResponse } from "next/server";
import connect from "@/db";
import Member from "@/models/member";

connect();
/**
 *
 * @param {NextRequest} request
 * @returns
 */
export async function GET(request) {
  const { searchParams } = request.nextUrl;
  const membershipNumber = searchParams.get("membershipNumber");
  if (membershipNumber) {
    return Member.findOne({ membershipNumber }).then(
      (member) => {
        if (!member) {
          return NextResponse.json({
            errorMessage: "Invalid membership number",
          });
        }
        return NextResponse.json({ member });
      },
      (error) => {
        return NextResponse.json({ error });
      }
    );
  }
  return Member.find().then(
    (members) => {
      return NextResponse.json({ members });
    },
    (error) => {
      return NextResponse.json({ error });
    }
  );
}
