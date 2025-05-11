import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import FormData from "form-data";
import Mailgun from "mailgun.js";

const app = express();
const PORT = 3001;

// Mailgun setup
const mailgun = new Mailgun(FormData);
const mg = mailgun.client({
  username: "api",
  key: process.env.MAILGUN_API_KEY,
  // url: "https://api.eu.mailgun.net" // Uncomment if you use EU region
});

app.use(cors());
app.use(bodyParser.json());

app.post("/send-tag-email", async (req, res) => {
  const { to, subject, text } = req.body;
  try {
    const data = await mg.messages.create("sandbox4da2976472a74df1a87131f6e5772627.mailgun.org", {
      from: "Tag Game <noreply@sandbox4da2976472a74df1a87131f6e5772627.mailgun.org>",
      to: [admin@reantec.xyz],
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