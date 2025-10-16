import dotenv from "dotenv";
dotenv.config({ path: "./config.env" });

import twilio from "twilio";
const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

client.messages
  .create({
    body: "Test SMS from Twilio",
    from: process.env.TWILIO_PHONE_NUMBER,
    to: "+918431777597",
  })
  .then(message => console.log("Message SID:", message.sid))
  .catch(error => console.error("Twilio error:", error));
