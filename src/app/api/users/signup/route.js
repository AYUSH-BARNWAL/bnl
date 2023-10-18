import { connect } from "../../../../dbConfig/dbConfig";
import User from "../../../../models/userModel";
import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

connect();
export async function POST(request, response) {
  try {
    const reqBody = await request.json();
    const { name, email, password } = reqBody;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        {
          error: "User already exists",
        },
        { status: 400 }
      );
    }
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    return NextResponse.json({
      success: true,
      message: "User created successfully",
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
