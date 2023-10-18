import {connect} from "@/dbConfig/dbConfig";
import {NextResponse} from "next/server";
import Promoter from "../../../../models/promoterModel";

connect();

export async function POST(request) {
  try {
    const pro = await request.json();
    await Promoter.create(pro);
    return NextResponse.json({
      success: true,
      message: "Promoter created successfully",
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
