import { NextResponse } from "next/server";

import connect from "@/db";
import CustomerAccount from "@/models/customerAccount";
import Membership from "@/models/membership";

connect();

export async function POST(request) {
  const reqBody = await request.json();
  //   console.log({ reqBody });
  const { membershipNumber } = reqBody;
  if (membershipNumber) {
    return CustomerAccount.find({ membershipNumber }).then(
      (customerAccounts) => {
        if (customerAccounts.length == 0) {
          return NextResponse.json({
            errorMessage:
              "No customer accounts found on this memberhsip number, make sure that membership number is valid and customer has an active account",
          });
        }
        return NextResponse.json({ customerAccounts });
      },
      (error) => {
        console.log({ error });
        return NextResponse.json({ error });
      }
    );
  }
  return NextResponse.json({ message: "Hello" });
}

export async function GET(request) {
  try {
    const customerAccounts = await CustomerAccount.find({});
    return NextResponse.json({ customerAccounts });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
