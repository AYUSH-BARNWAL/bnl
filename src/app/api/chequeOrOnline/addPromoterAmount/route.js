import ChequeOnline from "../../../../models/chequeOrOnlineModel";
import { connect } from "../../../../dbConfig/dbConfig";
import { NextResponse } from "next/server";

connect();

export async function POST(req, res) {
  try {
    const reqBody = await req.json();
    const {
      transactionType,
      accountType,
      totalShareValue,
      transactionDate,
      bankName,
      ifsc,
      balance,
      bankAccountNumber,
    } = reqBody;

    console.log(balance);

    const newChequeOnline = await ChequeOnline.create({
      transactionType,
      accountType,
      amount: parseInt(totalShareValue),
      transactionDate,
      balance: parseInt(totalShareValue) + parseInt(balance),
      bankName,
      ifsc,
      bankAccountNumber,
    });
    return NextResponse.json({
      success: true,
      message: "Money added to bank successfully",
      newChequeOnline,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
