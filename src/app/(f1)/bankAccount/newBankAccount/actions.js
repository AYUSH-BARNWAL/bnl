"use server";

import connect from "@/db";
import BankAccount from "@/models/bankAccount";
connect();

export async function addBankAccountAction(pState, formData) {
  const rawFormData = Object.fromEntries(formData.entries());
  const { accountNumber } = rawFormData;

  // TODO: Validate the fields

  return BankAccount.findOne({ accountNumber }).then(
    (account) => {
      if (account) {
        return { errorMessage: "Account number already created" };
      }
      return BankAccount.create(rawFormData).then(
        (bankAccount) => {
          console.log({ bankAccount });
          return { success: true };
        },
        (err) => {
          console.log({ err });
          return { errorMessage: "Error occured while adding bank account" };
        }
      );
    },
    () => {
      return { errorMessage: "Error while looking for account number" };
    }
  );
}
