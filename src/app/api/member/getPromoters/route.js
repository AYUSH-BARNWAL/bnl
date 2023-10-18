import { NextRequest, NextResponse } from "next/server";
import { connect } from "../../../../dbConfig/dbConfig";
import Promoter from "../../../../models/promoterModel";

connect();

export async function GET(req, res) {
  try {
    const promoters = await Promoter.find();
    return NextResponse.json(promoters);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
