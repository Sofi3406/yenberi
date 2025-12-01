import { sendEmail } from '../config/email.js';

export const sendVerificationEmail = async (userEmail, userName, token) => {
  const verificationUrl = `${process.env.FRONTEND_URL}/verify-email/${token}`;
  
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #2E7D32;">Email Verification - SLMA Platform</h2>
      <p>Hello ${userName},</p>
      <p>Thank you for registering with Silte Ləmat Mehber. Please verify your email address by clicking the button below:</p>
      <div style="text-align: center; margin: 30px 0;">
        <a href="${verificationUrl}" 
           style="background-color: #2E7D32; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block;">
          Verify Email Address
        </a>
      </div>
      <p>If you didn't create an account, please ignore this email.</p>
      <p>Best regards,<br>SLMA Team</p>
      <hr>
      <p style="font-size: 12px; color: #666;">
        This is an automated message, please do not reply to this email.
      </p>
    </div>
  `;

  await sendEmail(userEmail, 'Verify Your Email - SLMA Platform', html);
};

export const sendPasswordResetEmail = async (userEmail, userName, token) => {
  const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${token}`;
  
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #D32F2F;">Password Reset - SLMA Platform</h2>
      <p>Hello ${userName},</p>
      <p>You requested a password reset. Click the button below to reset your password:</p>
      <div style="text-align: center; margin: 30px 0;">
        <a href="${resetUrl}" 
           style="background-color: #D32F2F; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block;">
          Reset Password
        </a>
      </div>
      <p>This link will expire in 1 hour.</p>
      <p>If you didn't request a password reset, please ignore this email.</p>
      <p>Best regards,<br>SLMA Team</p>
      <hr>
      <p style="font-size: 12px; color: #666;">
        This is an automated message, please do not reply to this email.
      </p>
    </div>
  `;

  await sendEmail(userEmail, 'Password Reset Request - SLMA Platform', html);
};

export const sendWelcomeEmail = async (userEmail, userName, membershipId) => {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #2E7D32;">Welcome to SLMA! 🎉</h2>
      <p>Dear ${userName},</p>
      <p>Welcome to the Silte Ləmat Mehber community! We're excited to have you join us.</p>
      <p>Your membership ID is: <strong>${membershipId}</strong></p>
      <p>You can now access all member benefits and participate in community activities.</p>
      <div style="background-color: #FFF8E1; padding: 15px; border-radius: 5px; margin: 20px 0;">
        <h3>Next Steps:</h3>
        <ul>
          <li>Complete your profile</li>
          <li>Explore community projects</li>
          <li>Join upcoming events</li>
          <li>Connect with other members</li>
        </ul>
      </div>
      <p>Login to your dashboard to get started: 
        <a href="${process.env.FRONTEND_URL}/dashboard">${process.env.FRONTEND_URL}/dashboard</a>
      </p>
      <p>Best regards,<br>SLMA Team</p>
    </div>
  `;

  await sendEmail(userEmail, 'Welcome to SLMA!', html);
};