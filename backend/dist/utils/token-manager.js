import jwt from "jsonwebtoken";
import { COOKIE_NAME } from "./constants.js";
// Function to create a JWT token
export const createToken = (id, email, expiresIn) => {
    console.log(`Creating token for id: ${id}, email: ${email}, expiresIn: ${expiresIn}`);
    const payload = { id, email };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn,
    });
    console.log("Token created:", token);
    return token;
};
// Function to verify a JWT token
export const verifyToken = async (req, res, next) => {
    const token = req.signedCookies[`${COOKIE_NAME}`];
    console.log("Verifying token from cookies:", token); // Log the token from cookies
    if (!token || token.trim() === "") {
        console.log("Token not received or empty"); // Log if token is not received or is empty
        return res.status(401).json({ message: "Token Not Received" });
    }
    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.JWT_SECRET, (err, success) => {
            if (err) {
                console.error("Error verifying token:", err.message); // Log any errors during token verification
                reject(err.message);
                return res.status(401).json({ message: "Token Expired" });
            }
            else {
                console.log("Token successfully verified:", success); // Log successful token verification
                res.locals.jwtData = success;
                resolve();
                return next();
            }
        });
    });
};
//# sourceMappingURL=token-manager.js.map