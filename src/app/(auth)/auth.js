"use server";

import * as jose from "jose";
import { cookies } from "next/headers";

const { JWT_SECRET } = process.env;

const getJWTSecret = () => {
  const s = new TextEncoder().encode(JWT_SECRET);
  return s;
};
export async function getJwtToken() {
  const token = cookies().get("token")?.value || "";
  return token;
}

// export async function deleteJwtToken() {
//   const token = await getJwtToken();
//   if (token) {
//     cookies().delete("token");
//   }
// }

export async function saveJwtToken(payload, duration = "1h") {
  const jwt = await new jose.SignJWT(payload)
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setExpirationTime(duration)
    .sign(getJWTSecret());
  cookies().set("token", jwt, {
    maxAge: 7 * 24 * 60 * 60,
    httpOnly: true,
    secure: true,
  });
  return { success: true };
}

export async function verifyJwtToken(jwt) {
  return jose.jwtVerify(jwt, getJWTSecret()).then(
    ({ payload }) => {
      return { payload };
    },
    () => {
      return { error: "Invalid token" };
    }
  );
}
