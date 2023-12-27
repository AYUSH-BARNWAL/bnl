import { NextResponse } from "next/server";
import { connect } from "@/app/db";
import PromoterShare from "@/app/lib/models/promoterShares";

connect();
export async function GET(request) {
  return PromoterShare.find().then(
    (promoterShares) => {
      return NextResponse.json(promoterShares);
    },
    (error) => {
      return NextResponse.json({ error });
    }
  );
}
