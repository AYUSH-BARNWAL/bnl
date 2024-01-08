"use server";
import { revalidatePath } from "next/cache";
import connect from "@/db";
import CustomerAccount from "@/models/customerAccount";
import Counter from "@/models/counter";
import FdScheme from "@/models/fdScheme";
import RdScheme from "@/models/rdScheme";
import SaScheme from "@/models/saScheme";
import Transaction from "@/models/transaction";
import { generateTimestampOrderedStrings } from "@/functions";
import BankAccount from "@/models/bankAccount";
import Membership from "@/models/membership";
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
  const timestamp = generateTimestampOrderedStrings("TRN-D-");
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
  const isMemberValid = await Membership.findOne({
    membershipNumber: rawFormData.membershipNumber,
  });
  if (!isMemberValid) {
    return { errorMessage: "Invalid membership number" };
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
        async (customerAccount) => {
          console.log({ customerAccount });
          return Transaction.create({
            transactionNumber: timestamp,
            transactionDate: new Date(parseInt(timestamp.slice(6))),
            transactionType: "credit",
            paymode: rawFormData.paymode,
            amount: total,
            membershipNumber: rawFormData.membershipNumber,
            customerAccountNumber,
            bank_id:
              rawFormData.paymode == "online"
                ? (
                  await BankAccount.findOne({
                    accountNumber: rawFormData.accountNumber,
                  })
                )._id
                : "",
            particular: "New customer account created",
          }).then(
            () => {
              revalidatePath('/api', 'layout')
              return { success: true };
            },
            (error) => {
              console.log({ error });
              return { errorMessage: "Receipt is pending" };
            }
          );
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
