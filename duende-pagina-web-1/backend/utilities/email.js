// Create a new file, for instance, email.js in a utilities folder
const nodemailer = require("nodemailer");

const sendRecoveryEmail = async (email, tempPassword) => {
  // Create a transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: "Gmail", // Use Microsoft's Outlook service
    auth: {
      user: "duendeinfoemail@gmail.com",
      pass: "xcyv udtd xvzn hxhl",
    },
  });

  // Set up email data
  let mailOptions = {
    from: '"Duende" <your-email@outlook.com>', // Sender address
    to: email, // Receiver address
    subject: "Password Recovery", // Subject line
    text: `Your temporary password is: ${tempPassword}`, // Plain text body
  };

  // Send the email
  try {
    let info = await transporter.sendMail(mailOptions);
    console.log(`Message sent: ${info.messageId}`);
    return true; // Email sent successfully
  } catch (error) {
    console.error(`Error: ${error.message}`);
    return false; // Email sending failed
  }
};

module.exports = { sendRecoveryEmail };
