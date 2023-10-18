import { connect } from "../../../../dbConfig/dbConfig";
import User from "../../../../models/userModel";
import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect();
export async function POST(request, response) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return NextResponse.json({ error: "No User Found" }, { status: 400 });
    }
    const validPassword = await bcryptjs.compare(
      password,
      existingUser.password
    );
    if (!validPassword) {
      return NextResponse.json({ error: "Invalid Password" }, { status: 400 });
    }
    const token = jwt.sign(
      {
        id: existingUser._id,
        email: existingUser.email,
        name: existingUser.name,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    const res = NextResponse.json({
      success: true,
      message: "Login Successful",
    });
    res.cookies.set("token", token, {
      httpOnly: true,
      secure: true,
    });
    return res;
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
