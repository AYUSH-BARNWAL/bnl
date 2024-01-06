import { NextResponse } from "next/server";

import connect from "@/db";
import Promoter from "@/models/promoter";

connect();

export async function GET() {
    return Promoter.find({}).then(
        (promoters) => {
            return NextResponse.json({ promoters });
        },
        (error) => {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
    );
}