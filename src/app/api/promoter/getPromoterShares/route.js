import { NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import PromoterShareTransaction from "@/models/promoterShareTransaction";
connect();
export async function GET(request) {
  return PromoterShareTransaction.find()
    .sort({ _id: -1 })
    .then(
      (rows) => {
        // console.log(rows)
        let promoters = {};
        for (let row of rows) {
        //   console.log(row);
          if (!promoters[row.promoterName]) {
            promoters[row.promoterName] = row.sharesLeft;
          }
        }
        // promoters = Object.entries(promoters)
        return NextResponse.json(promoters);
      },
      (err) => {
        return NextResponse.json({ error: "Unable to fetch promoter data" });
      }
    );
}
