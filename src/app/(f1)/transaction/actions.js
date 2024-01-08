"use server";

import connect from "@/db";
import CustomerAccount from "@/models/customerAccount";
import Transaction from "@/models/transaction";
import BankAccount from "@/models/bankAccount";
import { generateTimestampOrderedStrings } from "@/functions";
import { revalidatePath } from "next/cache";

connect();
export async function transactionAction(pState, formData) {
  const timestamp = generateTimestampOrderedStrings(
    `TRN-${transactionType.toUpperCase()}-`
  );
  const rawFormData = Object.fromEntries(formData.entries());
  console.log({ rawFormData });
  let {
    membershipNumber,
    customerAccountNumber,
    accountType,
    amount,
    transactionType,
  } = rawFormData;
  // rawFormData.amount = parseInt(rawFormData.amount);
  amount = parseInt(amount);
  return CustomerAccount.findOne({
    membershipNumber,
    customerAccountNumber,
    accountType,
  }).then(
    async (customerAccount) => {
      if (!customerAccount) {
        return { errorMessage: "Invalid customer details" };
      }

      switch (accountType) {
        case "sa":
          if (transactionType == "debit") {
            if (customerAccount.balance < amount) {
              return {
                errorMessage: "Cannot withdraw more than available balance",
              };
            }
            const n = customerAccount.balance - amount;
            const t = await Transaction.create({
              ...rawFormData,
              balance: n,
              bank_id:
                rawFormData.paymode == "online"
                  ? (
                    await BankAccount.findOne({
                      accountNumber: rawFormData.accountNumber,
                    })
                  )._id
                  : "",
            });
            const c = await CustomerAccount.findOneAndUpdate(
              {
                membershipNumber,
                customerAccountNumber,
                accountType,
              },
              { $set: { balance: n } }
            );
            revalidatePath('/api', 'layout')
            return { success: "Transaction successful" };
          } else {
            const t = await Transaction.create({
              ...rawFormData,
              transactionNumber: timestamp,
              balance: amount + customerAccount.balance,
              bank_id:
                rawFormData.paymode == "online"
                  ? (
                    await BankAccount.findOne({
                      accountNumber: rawFormData.accountNumber,
                    })
                  )._id
                  : "",
            });
            const c = await CustomerAccount.findOneAndUpdate(
              {
                membershipNumber,
                customerAccountNumber,
                accountType,
              },
              { $set: { balance: amount + customerAccount.balance } }
            );
            return { success: "Transaction successful" };
          }

        case "rd":
          if (transactionType == "credit") {
            const t = await Transaction.create({
              ...rawFormData,
              balance: amount + customerAccount.balance,
              transactionNumber: timestamp,
              bank_id:
                rawFormData.paymode == "online"
                  ? (
                    await BankAccount.findOne({
                      accountNumber: rawFormData.accountNumber,
                    })
                  )._id
                  : "",
            });
            const c = await CustomerAccount.findOneAndUpdate(
              {
                membershipNumber,
                customerAccountNumber,
                accountType,
              },
              { $set: { balance: amount + customerAccount.balance } }
            );
            return { success: "Transaction successful" };
          } else {
            return {
              errorMessage: "This transaction is not supported at this moment",
            };
          }
          break;

        default:
          return {
            errorMessage: "This transaction is not supported at this moment",
          };
      }
    },
    (error) => {
      console.log({ error });
      return { errorMessage: "Unalbe to look for account" };
    }
  );
}
