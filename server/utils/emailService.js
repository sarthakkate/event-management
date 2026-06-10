const nodemailer = require('nodemailer');

let transporter;

// Initialize email transporter
const initializeEmailService = () => {
  if (process.env.EMAIL_SERVICE === 'gmail') {
    transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  } else if (process.env.SENDGRID_API_KEY) {
    transporter = nodemailer.createTransport({
      host: 'smtp.sendgrid.net',
      port: 587,
      auth: {
        user: 'apikey',
        pass: process.env.SENDGRID_API_KEY,
      },
    });
  } else {
    console.warn('Email service not configured. Email features will be limited.');
  }
};

// Send registration confirmation email
const sendRegistrationConfirmation = async (userEmail, userName, eventTitle) => {
  if (!transporter) {
    console.log(`[Email Simulation] Registration confirmation sent to ${userEmail}`);
    return;
  }

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: userEmail,
    subject: 'Event Registration Confirmation',
    html: `
      <h2>Welcome to Event Management System!</h2>
      <p>Hi ${userName},</p>
      <p>Your registration for the event <strong>${eventTitle}</strong> has been confirmed.</p>
      <p>You will receive a reminder 24 hours before the event.</p>
      <p>Best regards,<br>Event Management Team</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Registration email sent to ${userEmail}`);
  } catch (error) {
    console.error(`Error sending email: ${error.message}`);
  }
};

// Send event reminder email
const sendEventReminder = async (userEmail, userName, eventTitle, eventDate, eventTime, eventLocation) => {
  if (!transporter) {
    console.log(`[Email Simulation] Event reminder sent to ${userEmail}`);
    return;
  }

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: userEmail,
    subject: `Reminder: ${eventTitle} is Tomorrow!`,
    html: `
      <h2>Event Reminder</h2>
      <p>Hi ${userName},</p>
      <p>This is a reminder about the upcoming event:</p>
      <h3>${eventTitle}</h3>
      <p><strong>Date:</strong> ${new Date(eventDate).toDateString()}</p>
      <p><strong>Time:</strong> ${eventTime}</p>
      <p><strong>Location:</strong> ${eventLocation}</p>
      <p>See you there!</p>
      <p>Best regards,<br>Event Management Team</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Reminder email sent to ${userEmail}`);
  } catch (error) {
    console.error(`Error sending reminder email: ${error.message}`);
  }
};

// Send event cancellation email
const sendEventCancellation = async (userEmail, userName, eventTitle) => {
  if (!transporter) {
    console.log(`[Email Simulation] Cancellation email sent to ${userEmail}`);
    return;
  }

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: userEmail,
    subject: `Event Cancelled: ${eventTitle}`,
    html: `
      <h2>Event Cancellation Notice</h2>
      <p>Hi ${userName},</p>
      <p>We regret to inform you that the event <strong>${eventTitle}</strong> has been cancelled.</p>
      <p>Your registration has been refunded.</p>
      <p>Best regards,<br>Event Management Team</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Cancellation email sent to ${userEmail}`);
  } catch (error) {
    console.error(`Error sending cancellation email: ${error.message}`);
  }
};

module.exports = {
  initializeEmailService,
  sendRegistrationConfirmation,
  sendEventReminder,
  sendEventCancellation,
};
