"use server";

import connect from "@/db";
import FdScheme from "@/models/fdScheme";
import RdScheme from "@/models/rdScheme";
import SaScheme from "@/models/saScheme";
import { revalidatePath } from "next/cache";

connect();

export async function fdAction(pState, formData) {
  const rawFormData = Object.fromEntries(formData.entries());
  // console.log({ rawFormData });
  // TODO: Validate the input fields

  return FdScheme.create(rawFormData).then(
    () => {
      revalidatePath("/api/getFdSchemes");
      return { success: true };
    },
    (error) => {
      console.log({ error });
      return { errorMessage: "Unable to add scheme, please try again later" };
    }
  );
}
export async function rdAction(pState, formData) {
  const rawFormData = Object.fromEntries(formData.entries());
  // console.log({ rawFormData });
  // TODO: Validate the input fields

  return RdScheme.create(rawFormData).then(
    () => {
      revalidatePath("/api/scheme/getRdSchemes");
      return { success: true };
    },
    (error) => {
      console.log({ error });
      return { errorMessage: "Unable to add scheme, please try again later" };
    }
  );
}
export async function saAction(pState, formData) {
  const rawFormData = Object.fromEntries(formData.entries());
  // console.log({ rawFormData });
  // TODO: Validate the input fields
  return SaScheme.create(rawFormData).then(
    () => {
      revalidatePath("/api/getSaSchemes");
      return { success: true };
    },
    (error) => {
      console.log({ error });
      return { errorMessage: "Unable to add scheme, please try again later" };
    }
  );
}
