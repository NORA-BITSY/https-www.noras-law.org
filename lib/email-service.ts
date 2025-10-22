import nodemailer from 'nodemailer';

const smtpConfig = {
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
};

const transporter = nodemailer.createTransporter(smtpConfig);

// Verify connection
export async function verifyEmailConnection(): Promise<boolean> {
  try {
    await transporter.verify();
    return true;
  } catch (error) {
    console.error('Email verification failed:', error);
    return false;
  }
}

// Send email
export interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
  from?: string;
}

export async function sendEmail(options: EmailOptions): Promise<any> {
  try {
    const mailOptions = {
      from: options.from || `"Nora's Law" <${process.env.SMTP_USER}>`,
      to: options.to,
      subject: options.subject,
      html: options.html,
      text: options.text,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.messageId);
    return info;
  } catch (error) {
    console.error('Failed to send email:', error);
    throw error;
  }
}

// Template functions
export function generateWelcomeEmail(userName: string): EmailOptions {
  return {
    to: '', // Set recipient when calling
    subject: 'Welcome to Nora\'s Law Platform',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #2563eb;">Welcome to Nora's Law, ${userName}!</h1>
        <p>Thank you for joining our platform dedicated to supporting federal civil rights litigation.</p>
        <p>You can now:</p>
        <ul>
          <li>Access case management tools</li>
          <li>Upload and analyze evidence</li>
          <li>Generate legal documents</li>
          <li>Connect with our community</li>
        </ul>
        <p>If you have any questions, please don't hesitate to contact our support team.</p>
        <p>Best regards,<br>The Nora's Law Team</p>
      </div>
    `,
  };
}

export function generateCaseUpdateEmail(
  userEmail: string,
  caseTitle: string,
  updateType: string,
  details: string
): EmailOptions {
  return {
    to: userEmail,
    subject: `Case Update: ${caseTitle}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2563eb;">Case Update Notification</h2>
        <p><strong>Case:</strong> ${caseTitle}</p>
        <p><strong>Update Type:</strong> ${updateType}</p>
        <p><strong>Details:</strong></p>
        <p>${details}</p>
        <p>Please log in to your account to view the full details.</p>
        <p>Best regards,<br>The Nora's Law Team</p>
      </div>
    `,
  };
}

export function generateDocumentReadyEmail(
  userEmail: string,
  documentType: string,
  downloadUrl: string
): EmailOptions {
  return {
    to: userEmail,
    subject: `Your ${documentType} is Ready`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2563eb;">Document Ready for Download</h2>
        <p>Your ${documentType} has been generated and is ready for download.</p>
        <p><a href="${downloadUrl}" style="background-color: #2563eb; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Download Document</a></p>
        <p>This link will expire in 7 days.</p>
        <p>Best regards,<br>The Nora's Law Team</p>
      </div>
    `,
  };
}
