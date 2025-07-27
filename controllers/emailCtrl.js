// utils/sendEmail.js
/*const nodemailer = require("nodemailer");
require("dotenv").config();

//console.log("MAIL_USER:", process.env.MAIL_ID); // ✅ LOG HERE
//console.log("MAIL_PASS:", process.env.MAIL_PASS ? '✔️ Loaded' : '❌ Missing'); // Never log real password

const sendEmail = async (data) => {
  const transporter = nodemailer.createTransport({
    service: "gmail", // or "outlook", "yahoo", or custom SMTP
    auth: {
      user: process.env.MAIL_ID,
      pass: process.env.MAIL_MP,
    },
  });

  const mailOptions = {
    from: `"MOTECH HUB" <${process.env.MAIL_ID}>`,
    to: data.to,
    subject: data.subject,
    text: data.text,
    html: data.html,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;*/
/*(async () => {
  const info = await transporter.sendMail({
    from: `"Hey Hello ✔" <ABC@gmail.com><${process.env.MAIL_ID}`,
    to: data.to,
    subject: data.subject,
    text: data.text, // plain‑text body
    html: data.html, // HTML body
  });

  //console.log("Message sent:", info.messageId);

//})();
//});

//module.exports = sendEmail;*/



const nodemailer = require("nodemailer");
const asyncHandler = require("express-async-handler");

const sendEmail = asyncHandler(async(data,req,res) => {

    const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.MAIL_ID, // process.env.MAIL_ID,
    pass: process.env.MP, // process.env.MP,
  },
});

// Wrap in an async IIFE so we can use await.
const info = await transporter.sendMail({
    from: `"Hey Hello ✔" <ABC@gmail.com><${process.env.MAIL_ID}`,
    to: data.to, // list of receivers
    subject: data.subject, //subject line
    text: data.text, // plain‑text body
    html: data.html, // HTML body
    });

    console.log ("Message sent: to ", info.messageId);

});

    module.exports = sendEmail;
