import { NextResponse } from "next/server";
import connect from "@/db";
import Transaction from "@/models/transaction";

connect();

export async function GET() {
    return Transaction.find().then(
        (transactions) => {
            return NextResponse.json({ transactions })
        },
        (error) => {
            return NextResponse.json({ error })
        }
    )
}
