import { NextResponse } from "next/server";
import connect from "@/db";
import PromoterShare from "@/models/promoterShare";

connect();

export async function GET(request) {
  return PromoterShare.find().then(
    (promoterShares) => {
      return NextResponse.json({ promoterShares });
    },
    (error) => {
      return NextResponse.json({ error });
    }
  );
}
