"use server";

import { jwtVerify } from "jose";
import { cookies } from "next/headers";
import { sign } from "jsonwebtoken";
const { JWT_SECRET } = process.env;

export async function getJwtSecret() {
  return new TextEncoder().encode(JWT_SECRET);
}

export async function verifyJwtToken(token) {
  return jwtVerify(token, getJwtSecret()).then(
    (payload) => {
      return payload;
    },
    () => {
      return { error: "Verification failed" };
    }
  );
}

export async function saveJwtToken(payload, duration = "1h") {
  const token = sign(payload, JWT_SECRET, { expiresIn: duration });
  cookies().set("token", token);
  return { message: "Token saved successfully" };
}
