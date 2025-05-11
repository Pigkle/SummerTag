import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import FormData from "form-data";
import Mailgun from "mailgun.js";
import admin from "firebase-admin";  // Firebase Admin SDK
import { Buffer } from "buffer";

// Initialize Firebase Admin (Make sure you have your service account JSON set up)
admin.initializeApp({
  credential: admin.credential.applicationDefault(), // Or use serviceAccount if needed
  databaseURL: "https://tag-6d9b8-default-rtdb.firebaseio.com/" 
});

const db = admin.database();

const app = express();
const PORT = 3001;

// Mailgun setup
const mailgun = new Mailgun(FormData);
const mg = mailgun.client({
  username: "api",
  key: process.env.MAILGUN_API_KEY,
});

app.use(cors());
app.use(bodyParser.json());

function decodeBase64(str) {
  return Buffer.from(str, 'base64').toString('utf-8');
}

// Endpoint to send tag notif
app.post("/send-tag-email", async (req, res) => {
  const { gameId, taggerName, taggedName } = req.body;

  try {

    const playersSnapshot = await db.ref(`games/${gameId}/players`).once('value');
    const players = playersSnapshot.val() || {};


    const bccEmails = [];
    Object.values(players).forEach(player => {
      if (player.email) {
        const decodedEmail = decodeBase64(player.email);
        bccEmails.push(decodedEmail);
      }
    });

    if (bccEmails.length === 0) {
      return res.status(400).json({ error: "No player emails found" });
    }

    // Compose the notif
    const subject = 'Tag Alert!';
    const text = `${taggerName} just tagged ${taggedName} in the game!`;

    const data = await mg.messages.create("sandbox4da2976472a74df1a87131f6e5772627.mailgun.org", {
      from: "Tag Game <noreply@sandbox4da2976472a74df1a87131f6e5772627.mailgun.org>",
      to: "noreply@sandbox4da2976472a74df1a87131f6e5772627.mailgun.org", // placeholder 'To'
      bcc: bccEmails,
      subject,
      text,
    });

    console.log("Mailgun response:", data);
    res.json({ success: true, data });

  } catch (error) {
    console.error("Mailgun error:", error);
    res.status(500).json({ error: "Failed to send email", details: error });
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Mailgun email server running on port ${PORT}`);
});
