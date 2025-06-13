const express = require("express");
const router = express.Router();
const { transporter, adminTemplate, userTemplate } = require("../utils/email");

router.post("/", async (req, res) => {
  const { name, email, phone, message } = req.body;

  if (!name || !email || !phone || !message) {
    return res.status(400).json({ error: "All fields are required." });
  }

  const formData = { name, email, phone, message };

  try {
    await transporter.sendMail({
      from: `"ZenThink Website" <${process.env.REACT_APP_EMAIL_USER}>`,
      to: "info@zenthink.in",
      subject: `New Contact Form Submission from ${name}`,
      html: adminTemplate(formData),
    });

    await transporter.sendMail({
      from: `"ZenThink" <${process.env.REACT_APP_EMAIL_USER}>`,
      to: email,
      subject: "Thank You for Contacting ZenThink",
      html: userTemplate(formData),
    });

    res
      .status(200)
      .json({ success: true, message: "Emails sent successfully" });
  } catch (err) {
    console.error("❌ Email error:", err.message);
    res
      .status(500)
      .json({ error: "Failed to send email", message: err.message });
  }
});

module.exports = router;
