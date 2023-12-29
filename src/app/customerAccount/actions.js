"use server";

import connect from "@/db";
import CustomerAccount from "@/models/customerAccount";

connect();
export async function newCustomerAccountAction(pState, formData) {
  const rawFormData = Object.fromEntries(formData.entries());
  console.log({ rawFormData });

  // TODO: Validate the input fields

  return CustomerAccount.create(rawFormData).then(
    (customerAccount) => {
      // TODO: Process the transaction (cash/cheque/online) and allot account number and all (both frontend and backend)
      return { success: true };
    },
    (error) => {
      console.log({ error });
      return { errorMessage: "Unable to create account, try again later" };
    }
  );
}
