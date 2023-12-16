import { connect } from "@/dbConfig/dbConfig";
import { NextResponse } from "next/server";
import CustomerAccount from "@/models/customerAccountModel";

connect();

export async function POST(request) {
  try {
    const account = await request.json();
    await CustomerAccount.create(scheme);
    return NextResponse.json({
      success: true,
      message: "Customer Account created successfully",
    });
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      {
        error: e.message,
      },
      {
        status: 500,
      }
    );
  }
}
