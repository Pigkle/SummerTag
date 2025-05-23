import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import FormData from "form-data";
import Mailgun from "mailgun.js";
import admin from "firebase-admin";  // Firebase Admin SDK
import { Buffer } from "buffer";

// Parse service account from env var
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

serviceAccount.private_key = serviceAccount.private_key.replace(/\\n/g, '\n');

// Initialize Firebase Admin (Make sure you have your service account JSON set up)
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
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
    // Fetch players data from the game
    const playersSnapshot = await db.ref(`games/${gameId}/players`).once('value');
    const players = playersSnapshot.val() || {};

    // Initialize an array to store BCC 
    const bccEmails = [];

    // Loop through each player in the game
    for (const playerId in players) {
      const player = players[playerId];

      // Fetch the data from the node
      const emailSnapshot = await db.ref(`emails/${playerId}/email`).once('value');
      const encodedEmail = emailSnapshot.val();

      if (encodedEmail) {
      
        const decodedEmail = decodeBase64(encodedEmail);
        bccEmails.push(decodedEmail);
      }
    }

    if (bccEmails.length === 0) {
      return res.status(400).json({ error: "No player emails found" });
    }

    // Compose the notif
    const subject = 'Tag Alert!';
    const text = `${taggerName} just tagged ${taggedName} in the game!`;

    // Send the notif via Mailgun
    const data = await mg.messages.create("reantec.xyz", {
      from: "Tag Game <noreply@reantec.xyz>",
      to: "noreply@reantec.xyz", // placeholder 'To'
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
