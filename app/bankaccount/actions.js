"use server";

import { connect } from "../db";
import BankAccount from "../lib/models/bankAccount";

connect();

export async function addBankAccountAction(pState, formData) {
  const rawFormData = Object.fromEntries(formData.entries());
  //   console.log(rawFormData);
  const {
    bankname,
    accountopeningdate,
    accountnumber,
    accounttype,
    branch,
    ifsc,
    address,
  } = rawFormData;

  if (
    !bankname ||
    !accountopeningdate ||
    !accountnumber ||
    !accounttype ||
    !branch ||
    !ifsc ||
    !address
  ) {
    return { error: "All the fields are required" };
  }

  return BankAccount.findOne({ accountnumber }).then(
    (account) => {
      if (account) {
        return { error: "Account number already created" };
      }
      return BankAccount.create({
        bankname,
        accountopeningdate,
        accountnumber,
        accounttype,
        branch,
        ifsc,
        address,
      }).then(
        (bankAccount) => {
          return { success: true, message: "Account added successfully" };
        },
        (err) => {
          // console.log(err)
          return { error: "Error occured while adding bank account" };
        }
      );
    },
    () => {
      return { error: "Error while looking for account number" };
    }
  );
}
