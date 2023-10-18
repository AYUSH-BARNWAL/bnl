import BankAccount from "../../../../models/bankAccountModel";
import { connect } from "../../../../dbConfig/dbConfig";
import { NextResponse } from "next/server";

connect();

export async function POST(req, res) {
  try {
    const reqBody = await req.json();
    const {
      bankname,
      accountnumber,
      accountopeningdate,
      ifsc,
      branch,
      address,
      accounttype,
    } = reqBody;

    const existingBankAccount = await BankAccount.findOne({ accountnumber });
    if (existingBankAccount) {
      return NextResponse.json(
        {
          error: "Bank Account already exists",
        },
        { status: 400 }
      );
    }
    const newBankAccount = await BankAccount.create({
      bankname,
      accountnumber,
      accountopeningdate,
      ifsc,
      branch,
      address,
      accounttype,
    });
    return NextResponse.json({
      success: true,
      message: "Bank Account created successfully",
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        error: error.message,
      },
      { status: 500 }
    );
  }
}
