/**
 * ARTHUR MOSES PORTFOLIO - EXPRESS & NODEMAILER BACKEND SERVER
 */

const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve Static Frontend Files
app.use(express.static(path.join(__dirname, 'public')));

/**
 * Basic Input Sanitizer to prevent XSS / HTML Injection
 */
function sanitizeInput(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Validate Email Format
 */
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * POST /api/contact - Handle Contact Form Submissions
 */
app.post('/api/contact', async (req, res) => {
  try {
    let { name, email, subject, message } = req.body;

    // 1. Server-side validation
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed: All fields (Name, Email, Subject, Message) are required.'
      });
    }

    name = sanitizeInput(name.trim());
    email = email.trim();
    subject = sanitizeInput(subject.trim());
    message = sanitizeInput(message.trim());

    if (!isValidEmail(email)) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed: Please enter a valid email address.'
      });
    }

    // 2. Nodemailer SMTP Setup (Supports both SMTP_* and EMAIL_* Vercel naming conventions)
    const smtpHost = process.env.SMTP_HOST || process.env.EMAIL_HOST;
    const smtpPort = process.env.SMTP_PORT || process.env.EMAIL_PORT || 587;
    const smtpUser = process.env.SMTP_USER || process.env.EMAIL_USER;
    const smtpPass = process.env.SMTP_PASS || process.env.EMAIL_PASS;
    const recipientEmail = process.env.RECIPIENT_EMAIL || process.env.EMAIL_FROM || process.env.EMAIL_USER || 'mosesarthur799@gmail.com';

    // HTML Email Template
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; background-color: #f4f6f8; padding: 20px; color: #333; }
          .card { background: #ffffff; border-radius: 12px; padding: 25px; max-width: 600px; margin: 0 auto; box-shadow: 0 4px 15px rgba(0,0,0,0.08); }
          .header { font-size: 20px; font-weight: bold; color: #6C5CE7; border-bottom: 2px solid #e6ecf0; padding-bottom: 12px; margin-bottom: 20px; }
          .field { margin-bottom: 15px; }
          .label { font-weight: bold; color: #64748B; font-size: 13px; text-transform: uppercase; }
          .value { font-size: 15px; color: #1E293B; margin-top: 4px; line-height: 1.5; }
          .message-box { background: #e6ecf0; padding: 15px; border-radius: 8px; font-size: 15px; border-left: 4px solid #FFB703; }
          .footer { font-size: 12px; color: #94A3B8; margin-top: 25px; text-align: center; }
        </style>
      </head>
      <body>
        <div class="card">
          <div class="header">📬 New Portfolio Inquiry for Arthur Moses</div>
          <div class="field">
            <div class="label">Sender Name:</div>
            <div class="value">${name}</div>
          </div>
          <div class="field">
            <div class="label">Sender Email:</div>
            <div class="value"><a href="mailto:${email}">${email}</a></div>
          </div>
          <div class="field">
            <div class="label">Subject / Company:</div>
            <div class="value">${subject}</div>
          </div>
          <div class="field">
            <div class="label">Message Details:</div>
            <div class="message-box">${message.replace(/\n/g, '<br>')}</div>
          </div>
          <div class="footer">Received via Arthur Moses Neumorphic Portfolio Website</div>
        </div>
      </body>
      </html>
    `;

    // Check if live SMTP credentials exist
    if (smtpHost && smtpUser && smtpPass) {
      const isGmail = smtpHost.toLowerCase().includes('gmail');
      
      const transportConfig = isGmail ? {
        service: 'gmail',
        auth: {
          user: smtpUser,
          pass: smtpPass
        },
        tls: {
          rejectUnauthorized: false
        }
      } : {
        host: smtpHost,
        port: Number(smtpPort),
        secure: Number(smtpPort) === 465,
        auth: {
          user: smtpUser,
          pass: smtpPass
        },
        tls: {
          rejectUnauthorized: false
        }
      };

      const transporter = nodemailer.createTransport(transportConfig);

      const mailOptions = {
        from: `"${name}" <${smtpUser}>`,
        replyTo: email,
        to: recipientEmail,
        subject: `[Portfolio Contact] ${subject}`,
        text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}`,
        html: htmlContent
      };

      await transporter.sendMail(mailOptions);
      console.log(`[NODEMAILER SUCCESS] Email sent to ${recipientEmail} from ${email}`);
      
      return res.status(200).json({
        success: true,
        message: 'Message sent successfully! I will get back to you soon.'
      });
    } else {
      // Fallback Mode for local testing without active SMTP keys
      console.log('\n=================== NEW CONTACT FORM SUBMISSION (DEV MOCK MODE) ===================');
      console.log(`Name:        ${name}`);
      console.log(`Email:       ${email}`);
      console.log(`Subject:     ${subject}`);
      console.log(`Message:     ${message}`);
      console.log(`Recipient:   ${recipientEmail}`);
      console.log('===================================================================================\n');

      return res.status(200).json({
        success: true,
        message: 'Message sent successfully! I will get back to you soon.'
      });
    }

  } catch (error) {
    console.error('[NODEMAILER ERROR]', error);
    
    let userErrorMessage = 'Failed to send email. ';
    if (error.code === 'EAUTH' || (error.response && error.response.includes('535'))) {
      userErrorMessage += 'SMTP Authentication failed. If using Gmail, make sure to use a 16-character App Password instead of your regular password.';
    } else if (error.code === 'ESOCKET' || error.code === 'ETIMEDOUT') {
      userErrorMessage += 'SMTP connection timed out. Please check your SMTP host and port settings.';
    } else {
      userErrorMessage += error.message || 'Please verify your SMTP credentials.';
    }

    return res.status(500).json({
      success: false,
      error: userErrorMessage
    });
  }
});

// Fallback to index.html for SPA routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start Server & Export for Vercel
app.listen(PORT, () => {
  console.log(`\n==================================================`);
  console.log(`🚀 Arthur Moses Portfolio Server running on port ${PORT}`);
  console.log(`🌐 Local URL: http://localhost:${PORT}`);
  console.log(`==================================================\n`);
});

module.exports = app;
