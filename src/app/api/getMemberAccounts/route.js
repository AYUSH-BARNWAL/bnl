import { NextResponse } from "next/server";
import connect from "@/db";
import Member from "@/models/member";

connect();

export async function GET(request) {
    return Member.find().then(
        (members) => {
            return NextResponse.json({ members });
        },
        (error) => {
            return NextResponse.json({ error });
        }
    );
}
