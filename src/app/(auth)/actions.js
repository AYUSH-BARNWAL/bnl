"use server";

import bcrypt from "bcrypt";
import { redirect } from "next/navigation";
import connect from "@/db";
import User from "@/models/user";
import { saveJwtToken } from "./auth";
import { deleteJwtToken } from "./auth";

connect();

export async function loginAction(pState, formData) {
  const rawFormData = Object.fromEntries(formData.entries());
  const { email, password, rememberme } = rawFormData;
  //   TODO: Validate email and password

  return User.findOne({ email }).then(
    (user) => {
      if (!user) {
        return { errorMessage: "User not found" };
      }
      return bcrypt.compare(password, user.password).then((isTrue) => {
        if (!isTrue) {
          return { errorMessage: "Invalid password" };
        }
        const payload = {
          id: user._id,
          email: user.email,
          name: user.name,
          isAdmin: user.isAdmin,
        };
        return saveJwtToken(payload, rememberme ? "7d" : "1h").then(() => {
          return { success: true };
        });
      });
    },
    () => {
      return { errorMessage: "Unable to find user" };
    }
  );
}

export async function signupAction(pState, formData) {
  const rawFormData = Object.fromEntries(formData.entries());
  const { name, email, password } = rawFormData;

  // TODO: Validate the fields

  return User.findOne({ email }).then(
    async (user) => {
      if (user) {
        return { errorMessage: "Email is already registered" };
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      return User.create({ name, email, password: hashedPassword }).then(
        () => {
          return { success: true, message: "Registration successful" };
        },
        () => {
          return { errorMessage: "Unable to register user" };
        }
      );
    },
    () => {
      return { errorMessage: "Unable to look for user" };
    }
  );
}

export async function logoutAction() {
  await deleteJwtToken();
  redirect("/login");
}
