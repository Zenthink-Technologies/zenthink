const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.REACT_APP_EMAIL_USER,
    pass: process.env.REACT_APP_EMAIL_PASSWORD,
  },
});

const adminTemplate = ({ name, email, phone, message }) => `
  <h2>New Contact Form Submission</h2>
  <p><strong>Name:</strong> ${name}</p>
  <p><strong>Email:</strong> ${email}</p>
  <p><strong>Phone:</strong> ${phone}</p>
  <p><strong>Message:</strong> ${message}</p>
`;

const userTemplate = ({ name, email, phone, message }) => `
  <h2>Thank You for Contacting Us</h2>
  <p>Hello ${name}, we’ve received your message and will reach out soon.</p>
  <hr />
  <p><strong>Your Message:</strong></p>
  <p>${message}</p>
`;

module.exports = { transporter, adminTemplate, userTemplate };
