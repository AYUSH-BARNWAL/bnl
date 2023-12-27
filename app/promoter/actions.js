"use server";

import { connect } from "../db";
import Promoter from "../lib/models/promoter";
import ShareTransaction from "../lib/models/shareTransaction";
import PromoterShare from "../lib/models/promoterShares";
import { generateTimestampOrderedStrings } from "../lib/functions";
connect();

export async function addPromoterAction(pState, formData) {
  const timestamp = generateTimestampOrderedStrings("TRN-SBTP-");
  const rawFormData = Object.fromEntries(formData.entries());
  for (let key in rawFormData) {
    if (key.startsWith("$ACTION")) {
      // console.log(key);
      delete rawFormData[key];
    }
  }

  // console.log(rawFormData);
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
        tNumber: timestamp,
      }).then(
        (shareTransaction) => {
          // console.log({ shareTransaction });
          return PromoterShare.create({
            promoterId: promoter._id,
            promoterName: shareTransaction.promoterName,
            sharesLeft: shareTransaction.sharesSold,
          }).then(
            () => {
              // TODO: receipt work
              return { success: "Promoter created successfully" };
            },
            (error) => {
              console.log({ error });
              return {
                error:
                  "Some error occurred in post processing but promoter has has been added",
              };
            }
          );
        },
        (error) => {
          console.log({ error });
          return { error: "Unable to record share transaction" };
        }
      );
    },
    (err) => {
      console.log({ err });
      return { error: "Unable to add promoter" };
    }
  );
}
