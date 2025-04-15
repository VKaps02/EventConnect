import admin from "firebase-admin";
import dotenv from "dotenv";

dotenv.config();

// Check if FIREBASE_ADMIN_CREDENTIALS is set
if (!process.env.FIREBASE_ADMIN_CREDENTIALS) {
  throw new Error("Missing FIREBASE_ADMIN_CREDENTIALS in .env file");
}

const serviceAccount = JSON.parse(process.env.FIREBASE_ADMIN_CREDENTIALS);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const ADMIN_EMAILS = ["eventconnectadmin@connect.com", "youradmin@gmail.com"];

export const verifyAdmin = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized - No token provided" });
  }

  const token = authHeader.split("Bearer ")[1];

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    // console.log("🔹 Decoded Token:", decodedToken); // ✅ Debug decoded token

    const userEmail = decodedToken.email;
    if (ADMIN_EMAILS.includes(userEmail)) {
      req.user = decodedToken;
      next();
    } else {
      return res.status(403).json({ error: "Access Denied - Not an Admin" });
    }
  } catch (err) {
    console.error("🔴 Token Verification Failed:", err.message); // ✅ Debug error
    return res.status(401).json({ error: "Invalid Token" });
  }
};
