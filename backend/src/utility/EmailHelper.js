const nodemailer = require("nodemailer");

const EmailSend = async (EmailTo, EmailText, EmailSubject) => {
  let transport = nodemailer.createTransport({
    host: "mail.codewithfoyzun.com",
    port: 587,
    secure: false,
    auth: {
      user: "codewith",
      pass: "]47g@NcAtcpcRqp2wAHOUB5uQh4dTTq3uG",
    },
    tls: { rejectUnauthorized: false },
  });

  let mailOption = {
    from: '"Blog Application" <info@codewithfoyzun.com>',
    to: EmailTo,
    subject: EmailSubject,
    text: EmailText,
  };

  try {
    const response = await transport.sendMail(mailOption);
    console.log("Email sent successfully:", response);
    return response;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};

module.exports = EmailSend;
