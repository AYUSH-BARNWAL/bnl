"use server";

import { connect } from "../db";
import { generateTimestampOrderedStrings } from "../lib/functions";
import Member from "../lib/models/member";
import PromoterShare from "../lib/models/promoterShares";
import ShareTransaction from "../lib/models/shareTransaction";
import Generator from "../lib/models/generator";
import Membership from "../lib/models/membership";

connect();
export async function addMemberAction(pState, formData) {
  const timestamp = generateTimestampOrderedStrings("TRN-SPTM-");

  const rawFormData = Object.fromEntries(formData.entries());
  for (let key in rawFormData) {
    if (key.startsWith("$ACTION")) {
      //   console.log(key);
      delete rawFormData[key];
    }
  }
  console.log({ rawFormData });
  //   TODO: Validate the input fields

  return PromoterShare.findOne({ _id: rawFormData.promoter }).then(
    async (promoterShare) => {
      console.log({ promoterShare });
      let sl = promoterShare.sharesLeft - rawFormData.numberOfShares;
      if (sl < 0) {
        return { error: "Cannot sell more shares than available" };
      }
      const { membershipNumber } = await Generator.findOne();
      console.log({ membershipNumber });
      await Generator.updateOne(
        { membershipNumber },
        { membershipNumber: membershipNumber + 1 }
      );
      return Member.create({ ...rawFormData, membershipNumber }).then(
        (member) => {
          return ShareTransaction.create({
            promoterId: promoterShare.promoterId,
            promoterName: promoterShare.promoterName,
            sharesSold: rawFormData.numberOfShares,
            shareValue: rawFormData.sharePurchaseAmount,
            direction: "PTM",
            tNumber: timestamp,
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
                        info: "Under process",
                      };
                    }
                  );
                },
                (error) => {
                  console.log({ error });
                  return {
                    info: "Membership creation is pending, wait for some time",
                  };
                }
              );
            },
            (error) => {
              Member.deleteOne(member);
              return { error: "Unable to sell shares, try again later" };
            }
          );
        },
        (error) => {
          return { error: "Unable to add member, try again later" };
        }
      );
    }
  );

  // const {}
  //   axios.get("/api/getPrommoterShares/getPromoterShares").then((p) => {});

  //   return Member.create(rawFormData).then(
  //     (member) => {
  //       console.log({ member });
  //     },
  //     (error) => {
  //       console.log({ error });
  //       return { error: "Unable to save personal details" };
  //     }
  //   );
}
