import { jwtVerify } from "jose";
export function getJwtSecret() {
  const { JWT_SECRET } = process.env;
  return new TextEncoder().encode(JWT_SECRET);
}

export async function verifyJwtToken(token) {
  return jwtVerify(token, getJwtSecret()).then(
    (payload) => {
      return payload;
    },
    () => {
      return null;
    }
  );
}
