"use server";

import connect from "@/db";
import { generateTimestampOrderedStrings } from "@/functions";
import Member from "@/models/member";

import PromoterShare from "@/models/promoterShare";
import ShareTransaction from "@/models/shareTransaction";
import Membership from "@/models/membership";
import Counter from "@/models/counter";
import Transaction from "@/models/transaction";
import BankAccount from "@/models/bankAccount";
import { revalidatePath } from "next/cache";

connect();
export async function addMemberAction(pState, formData) {
  const timestamp = generateTimestampOrderedStrings("TRN-SPTM-");
  const rawFormData = Object.fromEntries(formData.entries());
  console.log({ rawFormData });

  //   TODO: Validate the input fields

  return PromoterShare.findOne({ _id: rawFormData.promoter }).then(
    async (promoterShare) => {
      console.log({ promoterShare });
      let sl = promoterShare.sharesLeft - rawFormData.numberOfShares;
      if (sl < 0) {
        return { errorMessage: "Cannot sell more shares than available" };
      }
      const { count: membershipNumber } = await Counter.findOneAndUpdate(
        { variableName: "membershipNumber" },
        { $inc: { count: 1 } },
        { new: true, upsert: true }
      );
      console.log({ membershipNumber });
      rawFormData.membershipNumber = membershipNumber;

      return Member.create(rawFormData).then(
        (member) => {
          return ShareTransaction.create({
            promoterId: promoterShare.promoterId,
            promoterName: promoterShare.promoterName,
            sharesSold: rawFormData.numberOfShares,
            shareValue: rawFormData.sharePurchaseAmount,
            direction: "PTM",
            transactionNumber: timestamp,
            membershipNumber,
          }).then(
            (shareTransaction) => {
              return Membership.create({
                date: new Date(parseInt(timestamp.slice(9))),
                membershipCharge: rawFormData.membershipCharge,
                numberOfShares: rawFormData.numberOfShares,
                shareValue: rawFormData.sharePurchaseAmount,
                membershipNumber,
              }).then(
                (membership) => {
                  return PromoterShare.updateOne(
                    { promoterId: promoterShare.promoterId },
                    { $set: { sharesLeft: sl } }
                  ).then(
                    async (ps) => {
                      return Transaction.create({
                        transactionNumber: timestamp,
                        transactionType: "share",
                        transactionDate: new Date(parseInt(timestamp.slice(9))),
                        amount: rawFormData.total,
                        membershipNumber,
                        paymode: rawFormData.paymode,
                        // bank_id:
                        //   rawFormData.paymode == "online"
                        //     ? (
                        //        BankAccount.findOne({
                        //         accountNumber: rawFormData.accountNumber,
                        //       }).then((ba)=>ba._id)
                        //     )
                        //     : "",
                        bank_id:
                          rawFormData.paymode == "online"
                            ? await BankAccount.findOne({
                                accountNumber: rawFormData.accountNumber,
                              }).then((ba) => ba._id)
                            : "",
                        particular: "Membership created",
                      }).then(
                        () => {
                          revalidatePath("/api/getMemberAccounts");
                          revalidatePath("/api/getPromoterShares");
                          revalidatePath("/api/getTransactions");
                          return {
                            success: true,
                            member: JSON.stringify(member),
                            shareTransaction: JSON.stringify(member),
                            membership: JSON.stringify(membership),
                            promoterShare: JSON.stringify(ps),
                          };
                        },
                        (error) => {
                          console.log({ error });
                          return { errorMessage: "Transaction is pending" };
                        }
                      );
                    },
                    () => {
                      return {
                        infoMessage: "Under process",
                      };
                    }
                  );
                },
                (error) => {
                  console.log({ error });
                  return {
                    infoMessage:
                      "Membership creation is pending, wait for some time",
                  };
                }
              );
            },
            async (error) => {
              await Member.deleteOne(member);
              return {
                errorMessage: "Unable to sell shares, try adding member again",
              };
            }
          );
        },
        (error) => {
          return { errorMessage: "Unable to add member, try again later" };
        }
      );
    }
  );
}
