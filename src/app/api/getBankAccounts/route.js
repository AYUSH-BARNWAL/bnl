import { NextResponse } from "next/server";
import connect from "@/db";
import BankAccount from "@/models/bankAccount";

connect();

export async function GET(request) {
  return BankAccount.find().then(
    (bankAccounts) => {
      return NextResponse.json({ bankAccounts });
    },
    (error) => {
      return NextResponse.json({ error });
    }
  );
}
