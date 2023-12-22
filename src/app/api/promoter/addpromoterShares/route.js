import { connect } from "@/dbConfig/dbConfig";
import { NextResponse } from "next/server";
import PromoterShareTransaction from "../../../../models/promoterShareTransaction";

connect();

export async function POST(request) {
    try {
        const promoterShareTransaction = await request.json();
        await PromoterShareTransaction.create(promoterShareTransaction);
        return NextResponse.json({
            success: true
        })
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            error: error.message
        }, {
            status: 500
        });
    }
}