"use server";

import connect from "@/db";
import Promoter from "@/models/promoter";
import ShareTransaction from "@/models/shareTransaction";
import PromoterShare from "@/models/promoterShare";
import Transaction from "@/models/transaction";
import { generateTimestampOrderedStrings } from "@/functions";
import BankAccount from "@/models/bankAccount";
import { revalidatePath } from "next/cache";
connect();

export async function addPromoterAction(pState, formData) {
  const timestamp = generateTimestampOrderedStrings("TRN-SBTP-");
  const rawFormData = Object.fromEntries(formData.entries());

  //   TODO: Validate the fields in error object

  return Promoter.create(rawFormData).then(
    (promoter) => {
      // return { success: "Promoter created" };
      return ShareTransaction.create({
        promoterId: promoter._id,
        promoterName: `${promoter.firstName} ${promoter?.middleName}${
          promoter?.middleName ? " " : ""
        }${promoter.lastName}`,
        sharesSold: promoter.shareNominalHold,
        shareValue: promoter.shareNominalValue,
        direction: "BTP",
        transactionNumber: timestamp,
      }).then(
        (shareTransaction) => {
          return PromoterShare.create({
            promoterId: promoter._id,
            promoterName: shareTransaction.promoterName,
            sharesLeft: shareTransaction.sharesSold,
          }).then(
            async () => {
              return Transaction.create({
                transactionNumber: timestamp,
                transactionType: "share",
                transactionDate: new Date(parseInt(timestamp.slice(9))),
                amount: rawFormData.totalShareValue,
                paymode: "online",
                bank_id: (
                  await BankAccount.findOne({
                    accountNumber: rawFormData.accountNumber,
                  })
                )._id,
                particular: "Promoter added",
              }).then(
                () => {
                  revalidatePath("/api/getPromoterData");
                  revalidatePath("/api/getPromoterShares");
                  revalidatePath('/api/getTransactions');
                  return { success: true };
                },
                (error) => {
                  console.log({ error });
                  return {
                    errorMessage:
                      "Receipt couldn't be generated, but promoter has been added",
                  };
                }
              );
            },
            (error) => {
              console.log({ error });
              return {
                errorMessage:
                  "Some error occurred in post processing but promoter has has been added",
              };
            }
          );
        },
        async (error) => {
          console.log({ error });
          await Promoter.deleteOne(promoter);
          return {
            errorMessage:
              "Unable to record share transaction, try adding promoter again",
          };
        }
      );
    },
    (err) => {
      console.log({ err });
      return { errorMessage: "Unable to add promoter" };
    }
  );
}
