import { NextRequest, NextResponse } from "next/server";
import { connect } from "../../../../dbConfig/dbConfig";
import BankAccount from "../../../../models/bankAccountModel";

connect();

export async function GET(req, res) {
  try {
    const bankAccounts = await BankAccount.find();
    return NextResponse.json(bankAccounts);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
