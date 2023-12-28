"use server";

import connect from "@/db";
import Promoter from "@/models/promoter";
import ShareTransaction from "@/models/shareTransaction";
import PromoterShare from "@/models/promoterShare";
import { generateTimestampOrderedStrings } from "@/functions";
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
            () => {
              // TODO: receipt work
              return { success: true };
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
