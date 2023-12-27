import { connect } from "@/app/db";
import BankAccount from "@/app/lib/models/bankAccount";
import { NextResponse } from "next/server";
connect();
export async function GET() {
  //   return Response.json({ message: "Hello" }).status(200);
  // return NextResponse.json({message:"Hello"})
  return BankAccount.find().then(
    (accounts) => {
      return NextResponse.json(accounts);
    },
    () => {
      return NextResponse.json({
        error: "Unable to find bank accounts at this moment",
      });
    }
  );
}
