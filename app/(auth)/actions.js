"use server";

import bcrypt from "bcrypt";
import { connect } from "../db";
import User from "../lib/models/user";
import { saveJwtToken } from "./auth";
import { isEmpty } from "../lib/functions";

const usernameRegex = /^.{4,}$/i;
const emailRegex = /^[\w-]+(\.[\w-]+)*@([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/i;

connect();

export async function loginAction(pState, formData) {
  //   const rawFormData = Object.fromEntries(formData.entries());
  //   console.log(rawFormData);
  const { email, password, rememberme } = Object.fromEntries(
    formData.entries()
  );
  console.log({ rememberme });
  const error = {};
  if (!emailRegex.test(email)) {
    error.email = "Please enter a valid email";
  }
  if (!password) {
    error.password = "Password cannot be blank";
  }
  if (!isEmpty(error)) {
    return { error, email: email, password: password };
  }
  return User.findOne({ email }).then(
    (user) => {
      if (!user) {
        return {
          message: "User not found",
          success: false,
        };
      }
      return bcrypt.compare(password, user.password).then(
        (isTrue) => {
          if (isTrue) {
            const payload = {
              id: user._id,
              email: user.email,
              name: user.name,
              isAdmin: user.isAdmin,
            };
            return saveJwtToken(payload, rememberme ? "7d" : "1h").then(() => {
              return { message: "Logging in", success: true };
            });
          }
          return {
            message: "Invalid password",
            email: email,
          };
        },
        () => {
          return {
            messsage: "Error while checking password",
            email: email,
            password: password,
          };
        }
      );
    },
    () => {
      return {
        message: "Error while searhing for user",
        email: email,
        password: password,
      };
    }
  );
}

export async function signupAction(pState, formData) {
  const { username, email, password } = Object.fromEntries(formData.entries());
  const error = {};

  if (!username || !usernameRegex.test(username)) {
    error.username = "Name cannot be of length less than 4";
  }
  if (!email || !emailRegex.test(email)) {
    error.email = "Please enter a valid email";
  }
  if (!password) {
    error.password = "Password cannot be blank";
  }
  console.log(error);
  if (!isEmpty(error)) {
    return { error, message: "Please check the fields and try again" };
  }
  return User.findOne({ email }).then(
    (user) => {
      if (user) {
        return { message: "Email already registered" };
      }
      return bcrypt.hash(password, 10).then(
        (pass) => {
          return User.create({
            name: username,
            email: email,
            password: pass,
          }).then(
            () => {
              return { success: true };
            },
            () => {
              return { messsage: "Error while creating user" };
            }
          );
        },
        () => {
          return { message: "Error while hashing password" };
        }
      );
    },
    () => {
      return { message: "Error while searching of user" };
    }
  );
}
