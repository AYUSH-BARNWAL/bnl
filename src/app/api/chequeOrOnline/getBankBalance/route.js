import { NextRequest, NextResponse } from "next/server";
import { connect } from "../../../../dbConfig/dbConfig";
import ChequeOnline from "../../../../models/chequeOrOnlineModel";

connect();

export async function POST(req, res) {
  const reqBody = await req.json();
  const bankAccountNumber = parseInt(reqBody.bankAccountNumber);
  if (isNaN(bankAccountNumber)) {
    return NextResponse.json(
      { error: "Invalid bankAccountNumber" },
      { status: 400 }
    );
  }

  try {
    const latestChequeOrOnline = await ChequeOnline.findOne(
      { bankAccountNumber: bankAccountNumber },
      {},
      { sort: { transactionDate: -1 }, limit: 1 }
    );

    if (!latestChequeOrOnline) {
      return NextResponse.json({ balance: 0 });
    }
    return NextResponse.json({ balance: latestChequeOrOnline.balance });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
