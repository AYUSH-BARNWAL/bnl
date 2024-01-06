import { NextResponse } from "next/server";
import connect from "@/db";
import Member from "@/models/member";

connect();

export async function POST(request) {
    try {
        const member = await Member.find(request.nextUrl.searchParams.get("membershipNumber"));
        if (member) return NextResponse.json({ member });
        return NextResponse.json({ error: "No member found" });
    }
    catch (error) {
        return NextResponse.json({ error });
    }
}