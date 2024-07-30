import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { COOKIE_NAME } from "./constants.js";

export const createToken = (id: string, email: string, expiresIn: string) => {
  console.log(`Creating token for id: ${id}, email: ${email}, expiresIn: ${expiresIn}`);
  
  const payload = { id, email };
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn,
  });

  console.log(`Token created: ${token}`);
  return token;
};

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(`Verifying token from cookies: ${req.signedCookies[`${COOKIE_NAME}`]}`);
  
  const token = req.signedCookies[`${COOKIE_NAME}`];
  
  if (!token || token.trim() === "") {
    console.error("Token not received or empty");
    return res.status(401).json({ message: "Token Not Received" });
  }
  
  try {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        console.error("Token verification failed:", err.message);
        return res.status(401).json({ message: "Token Expired" });
      } else {
        console.log("Token verified successfully:", decoded);
        res.locals.jwtData = decoded;
        return next();
      }
    });
  } catch (error) {
    console.error("Unexpected error during token verification:", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
