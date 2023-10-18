import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
export const getDataFromToken = (request) => {
  try {
    const token = request.cookies.get("token")?.value || "";
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded.id;
  } catch (error) {
    return new Error(error);
  }
};
