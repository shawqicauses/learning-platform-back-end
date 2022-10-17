const nodemailer = require("nodemailer")

const sendMail = async function sendMail(options) {
  const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: {
      user: process.env.MAIL_USER_NAME,
      pass: process.env.MAIL_PASSWORD
    }
  })

  const mailOptions = {
    from: "Shawqi Hatem <shawqicauses@outlook.com>",
    to: options.to,
    subject: options.subject,
    text: options.text
  }

  await transporter.sendMail(mailOptions)
}

module.exports = sendMail
