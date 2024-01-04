"use server";

import connect from "@/db";
import { generateTimestampOrderedStrings } from "@/functions";
import Member from "@/models/member";

import PromoterShare from "@/models/promoterShare";
import ShareTransaction from "@/models/shareTransaction";
import Membership from "@/models/membership";
import Counter from "@/models/counter";

connect();
export async function addMemberAction(pState, formData) {
  const timestamp = generateTimestampOrderedStrings("TRN-SPTM-");
  const rawFormData = Object.fromEntries(formData.entries());

  //   TODO: Validate the input fields

  return PromoterShare.findOne({ _id: rawFormData.promoter }).then(
    async (promoterShare) => {
      console.log({ promoterShare });
      let sl = promoterShare.sharesLeft - rawFormData.numberOfShares;
      if (sl < 0) {
        return { error: "Cannot sell more shares than available" };
      }
      const { count: membershipNumber } = await Counter.findOneAndUpdate(
        { variableName: "membershipNumber" },
        { $inc: { count: 1 } },
        { new: true, upsert: true }
      );
      console.log({ membershipNumber });

      return Member.create({ ...rawFormData, membershipNumber }).then(
        (member) => {
          return ShareTransaction.create({
            promoterId: promoterShare.promoterId,
            promoterName: promoterShare.promoterName,
            sharesSold: rawFormData.numberOfShares,
            shareValue: rawFormData.sharePurchaseAmount,
            direction: "PTM",
            transactionNumber: timestamp,
            membershipNumber: membershipNumber,
          }).then(
            (shareTransaction) => {
              return Membership.create({
                date: new Date(parseInt(timestamp.slice(9))),
                membershipCharge: rawFormData.membershipCharge,
                numberofShares: rawFormData.numberOfShares,
                shareValue: rawFormData.sharePurchaseAmount,
                membershipNumber,
              }).then(
                (membership) => {
                  return PromoterShare.updateOne(
                    { promoterId: promoterShare.promoterId },
                    { $set: { sharesLeft: sl } }
                  ).then(
                    (ps) => {
                      // TODO: cash/cheque/online mode processing
                      return {
                        success: true,
                        member: JSON.stringify(member),
                        shareTransaction: JSON.stringify(member),
                        membership: JSON.stringify(membership),
                        promoterShare: JSON.stringify(ps),
                      };
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
