"use server";

import connect from "@/db";
import CustomerAccount from "@/models/customerAccount";
import Counter from "@/models/counter";
import FdScheme from "@/models/fdScheme";
import RdScheme from "@/models/rdScheme";
import SaScheme from "@/models/saScheme";

connect();

async function allotAccountNumber(typ) {
  return Counter.findOneAndUpdate(
    { variableName: typ },
    { $inc: { count: 1 } },
    {
      new: true,
      upsert: true,
    }
  ).then(
    (doc) => {
      console.log({ doc });
      return { doc };
    },
    (error) => {
      console.log({ error });
      return { error };
    }
  );
}

export async function newCustomerAccountAction(pState, formData) {
  const rawFormData = Object.fromEntries(formData.entries());
  console.log({ rawFormData });
  const { accountType, total, schemeCode } = rawFormData;

  // TODO: Validate the input fields

  let minAmt = 0;
  try {
    switch (accountType) {
      case "rd":
        minAmt = (await RdScheme.findOne({ schemeCode })).minimumRdAmt;
        break;
      case "fd":
        minAmt = (await FdScheme.findOne({ schemeCode })).minimumFdAmt;
        break;
      case "sa":
        minAmt = (await SaScheme.findOne({ schemeCode })).minimumBalance;
        break;
      default:
        return { errorMessage: "Server error, try again later" };
    }
  } catch (error) {
    console.log({ error });
    return { errorMessage: "Internal server error, try again later" };
  }
  console.log({ minAmt });

  if (total < minAmt) {
    return {
      errorMessage: "Cannot open account with less than minimum amount",
    };
  }

  return allotAccountNumber(accountType).then(
    ({ doc: { count } }) => {
      const prefix = { rd: "BNL-RD-", fd: "BNL-FD-", sa: "BNL-SA-" };
      const customerAccountNumber = `${prefix[accountType]}${count}`;
      console.log({ customerAccountNumber });
      return CustomerAccount.create({
        ...rawFormData,
        customerAccountNumber,
        balance: total,
      }).then(
        (customerAccount) => {
          console.log({ customerAccount });
          // TODO: cash/cheque/online mode processing
          return { success: true };
        },
        (error) => {
          console.log({ error });
          return { errorMessage: "Unable to create account, try again later" };
        }
      );
    },
    (error) => {
      console.log({ error });
      return { errorMessaege: "Internal server error, try again later" };
    }
  );
}
