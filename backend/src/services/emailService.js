import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// Create transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  tls: {
    rejectUnauthorized: false
  }
});

// Test transporter connection
transporter.verify((error, success) => {
  if (error) {
    console.error('❌ Email transporter error:', error);
  } else {
    console.log('✅ Email server is ready to send messages');
  }
});

/**
 * Send verification email to new user
 */
export const sendVerificationEmail = async (email, name, token) => {
  try {
    const verificationUrl = `${process.env.FRONTEND_URL}/auth/verify-email?token=${token}`;
    
    const mailOptions = {
      from: `"Silte Ləmat Mehber" <${process.env.SMTP_FROM}>`,
      to: email,
      subject: 'Verify Your Email - Silte Ləmat Mehber',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Email Verification</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .button { display: inline-block; background: #4F46E5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold; }
            .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; color: #666; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Welcome to Silte Ləmat Mehber!</h1>
          </div>
          <div class="content">
            <h2>Hello ${name},</h2>
            <p>Thank you for registering with Silte Ləmat Mehber community.</p>
            <p>Please verify your email address by clicking the button below:</p>
            <p style="text-align: center; margin: 30px 0;">
              <a href="${verificationUrl}" class="button">Verify Email Address</a>
            </p>
            <p>This verification link will expire in 24 hours.</p>
            <p>If you didn't create an account, you can safely ignore this email.</p>
            <div class="footer">
              <p>Best regards,<br>The SLMA Team</p>
              <p>If the button doesn't work, copy and paste this link:<br>
              <small>${verificationUrl}</small></p>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `Hello ${name},\n\nWelcome to Silte Ləmat Mehber! Please verify your email by clicking this link: ${verificationUrl}\n\nIf you didn't create an account, ignore this email.\n\nBest regards,\nThe SLMA Team`
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`✅ Verification email sent to ${email}: ${info.messageId}`);
    return info;
  } catch (error) {
    console.error(`❌ Error sending verification email to ${email}:`, error);
    throw error;
  }
};

/**
 * Send payment verification email
 */
export const sendPaymentVerificationEmail = async (email, name, plan, membershipId) => {
  try {
    const amount = plan === 'active' ? 'ETB 500' : 'ETB 1,200';
    const planName = plan === 'active' ? 'Active Member' : 'Premium Member';
    
    const mailOptions = {
      from: `"SLMA Payment Verification" <${process.env.SMTP_FROM}>`,
      to: email,
      subject: `Payment Receipt Received - ${planName} Membership`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Payment Verification</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .info-box { background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #667eea; }
            .warning-box { background: #fffbeb; padding: 15px; border-radius: 8px; margin: 20px 0; border: 1px solid #fde68a; color: #92400e; }
            .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #666; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Payment Receipt Received</h1>
            <p>SLMA Membership Registration</p>
          </div>
          
          <div class="content">
            <h2>Hello ${name},</h2>
            <p>Thank you for submitting your payment receipt for <strong>${planName}</strong> membership.</p>
            
            <div class="info-box">
              <h3 style="margin-top: 0;">Registration Details:</h3>
              <p><strong>Membership ID:</strong> ${membershipId}</p>
              <p><strong>Plan:</strong> ${planName}</p>
              <p><strong>Amount:</strong> ${amount}</p>
              <p><strong>Status:</strong> <span style="color: #f59e0b;">Payment Verification Pending</span></p>
            </div>
            
            <h3>📋 Next Steps:</h3>
            <ol style="padding-left: 20px;">
              <li>Our team will verify your payment receipt</li>
              <li>You'll receive an email once verification is complete</li>
              <li>After verification, your membership will be activated</li>
              <li>You can then login and access all member benefits</li>
            </ol>
            
            <div class="warning-box">
              <p style="margin: 0;">
                ⏰ <strong>Verification Time:</strong> Usually within 24-48 hours
              </p>
            </div>
            
            <p>If you have any questions, please contact our membership team at <a href="mailto:membership@siltecommunity.org">membership@siltecommunity.org</a>.</p>
            
            <div class="footer">
              <p style="color: #6b7280; font-size: 12px;">
                This is an automated message. Please do not reply to this email.
              </p>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `Hello ${name},\n\nThank you for submitting your payment receipt for ${planName} membership.\n\nMembership ID: ${membershipId}\nPlan: ${planName}\nAmount: ${amount}\nStatus: Payment Verification Pending\n\nOur team will verify your payment receipt within 24-48 hours. You'll receive another email once verification is complete.\n\nIf you have questions, contact membership@siltecommunity.org\n\nBest regards,\nSLMA Team`
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`✅ Payment verification email sent to ${email}: ${info.messageId}`);
    return info;
  } catch (error) {
    console.error(`❌ Error sending payment verification email to ${email}:`, error);
    throw error;
  }
};

/**
 * Send payment approved email
 */
export const sendPaymentApprovedEmail = async (email, name, membershipId) => {
  try {
    const mailOptions = {
      from: `"SLMA Membership" <${process.env.SMTP_FROM}>`,
      to: email,
      subject: '🎉 Payment Verified - Welcome to SLMA!',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Payment Approved</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .success-box { background: #d1fae5; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #10b981; }
            .button { display: inline-block; background: #10b981; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold; }
            .badge { background: #4F46E5; color: white; padding: 5px 15px; border-radius: 20px; display: inline-block; font-weight: bold; }
            .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #666; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Payment Verified Successfully!</h1>
          </div>
          
          <div class="content">
            <h2>Congratulations ${name}!</h2>
            
            <div class="success-box">
              <h3 style="margin-top: 0; color: #065f46;">✅ Payment Approved</h3>
              <p>Your payment has been verified and your SLMA membership is now active!</p>
            </div>
            
            <p><strong>Your Membership ID:</strong> <span class="badge">${membershipId}</span></p>
            
            <h3>🎯 What's Next?</h3>
            <ul>
              <li>Access all member benefits on the platform</li>
              <li>Join community discussions and events</li>
              <li>Download your digital membership card</li>
              <li>Participate in voting and community decisions</li>
            </ul>
            
            <p style="text-align: center; margin: 30px 0;">
              <a href="${process.env.FRONTEND_URL}/dashboard" class="button">Go to Your Dashboard</a>
            </p>
            
            <p>Need help getting started? Check our <a href="${process.env.FRONTEND_URL}/help">Member Guide</a> or contact our support team.</p>
            
            <div class="footer">
              <p>Welcome to the SLMA community!</p>
              <p style="color: #6b7280; font-size: 12px;">
                This is an automated message from Silte Ləmat Mehber Association.
              </p>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `Congratulations ${name}!\n\nYour payment has been verified and your SLMA membership is now active!\n\nMembership ID: ${membershipId}\n\nYou can now:\n- Access all member benefits\n- Join community discussions\n- Attend events\n- Participate in voting\n\nLogin: ${process.env.FRONTEND_URL}/auth/login\n\nWelcome to the SLMA community!\n\nBest regards,\nSLMA Team`
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`✅ Payment approved email sent to ${email}: ${info.messageId}`);
    return info;
  } catch (error) {
    console.error(`❌ Error sending payment approved email to ${email}:`, error);
    throw error;
  }
};

/**
 * Send password reset email
 */
export const sendPasswordResetEmail = async (email, name, token) => {
  try {
    const resetUrl = `${process.env.FRONTEND_URL}/auth/reset-password/${token}`;
    
    const mailOptions = {
      from: `"Silte Ləmat Mehber" <${process.env.SMTP_FROM}>`,
      to: email,
      subject: 'Reset Your Password - Silte Ləmat Mehber',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Password Reset</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .button { display: inline-block; background: #4F46E5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold; }
            .warning { background: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; border-radius: 5px; margin: 20px 0; }
            .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; color: #666; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Password Reset Request</h1>
          </div>
          <div class="content">
            <h2>Hello ${name},</h2>
            <p>We received a request to reset your password for your Silte Ləmat Mehber account.</p>
            <p>Click the button below to create a new password:</p>
            <p style="text-align: center; margin: 30px 0;">
              <a href="${resetUrl}" class="button">Reset Password</a>
            </p>
            <div class="warning">
              <strong>⚠️ Important:</strong>
              <p>This link will expire in 1 hour for security reasons.</p>
              <p>If you didn't request a password reset, please ignore this email or contact support if you're concerned.</p>
            </div>
            <div class="footer">
              <p>Best regards,<br>The SLMA Team</p>
              <p>If the button doesn't work, copy and paste this link:<br>
              <small>${resetUrl}</small></p>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `Hello ${name},\n\nYou requested to reset your password. Click this link: ${resetUrl}\n\nThis link expires in 1 hour.\n\nIf you didn't request this, please ignore this email.\n\nBest regards,\nThe SLMA Team`
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`✅ Password reset email sent to ${email}: ${info.messageId}`);
    return info;
  } catch (error) {
    console.error(`❌ Error sending password reset email to ${email}:`, error);
    throw error;
  }
};

/**
 * Send welcome email after verification
 */
export const sendWelcomeEmail = async (email, name, membershipId) => {
  try {
    const mailOptions = {
      from: `"Silte Ləmat Mehber" <${process.env.SMTP_FROM}>`,
      to: email,
      subject: 'Welcome to Silte Ləmat Mehber!',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Welcome to SLMA</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .badge { background: #4F46E5; color: white; padding: 5px 15px; border-radius: 20px; display: inline-block; font-weight: bold; }
            .features { margin: 20px 0; }
            .feature-item { background: white; padding: 15px; margin: 10px 0; border-radius: 5px; border-left: 4px solid #4F46E5; }
            .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; color: #666; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>🎉 Welcome Aboard!</h1>
          </div>
          <div class="content">
            <h2>Hello ${name},</h2>
            <p>Congratulations! Your email has been verified and your account is now fully activated.</p>
            
            <p><strong>Your Membership ID:</strong> <span class="badge">${membershipId}</span></p>
            
            <div class="features">
              <h3>What you can do now:</h3>
              <div class="feature-item">
                <strong>👥 Connect with Community</strong>
                <p>Join discussions with other Siltie community members</p>
              </div>
              <div class="feature-item">
                <strong>📅 Attend Events</strong>
                <p>Participate in cultural and community events</p>
              </div>
              <div class="feature-item">
                <strong>💼 Access Resources</strong>
                <p>Get access to exclusive community resources</p>
              </div>
            </div>
            
            <p>Start exploring by logging into your account:</p>
            <p style="text-align: center; margin: 30px 0;">
              <a href="${process.env.FRONTEND_URL}/auth/login" class="button" style="background: #4F46E5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold;">Go to Dashboard</a>
            </p>
            
            <div class="footer">
              <p>Need help? Contact us at support@siltecommunity.org</p>
              <p>Best regards,<br>The SLMA Team</p>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `Hello ${name},\n\nWelcome to Silte Ləmat Mehber! Your account is now verified.\n\nYour Membership ID: ${membershipId}\n\nYou can now:\n- Connect with community members\n- Attend events\n- Access exclusive resources\n\nLogin: ${process.env.FRONTEND_URL}/auth/login\n\nNeed help? Contact support@siltecommunity.org\n\nBest regards,\nThe SLMA Team`
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`✅ Welcome email sent to ${email}: ${info.messageId}`);
    return info;
  } catch (error) {
    console.error(`❌ Error sending welcome email to ${email}:`, error);
    throw error;
  }
};

/**
 * Test email function
 */
export const testEmailService = async (toEmail) => {
  try {
    const testMailOptions = {
      from: `"SLMA Test" <${process.env.SMTP_FROM}>`,
      to: toEmail,
      subject: 'Test Email from SLMA Backend',
      text: 'This is a test email from your SLMA backend server. If you receive this, email service is working!',
      html: '<h1>Test Email</h1><p>This is a test email from your SLMA backend server.</p><p>If you receive this, email service is working correctly!</p>'
    };

    const info = await transporter.sendMail(testMailOptions);
    console.log(`✅ Test email sent to ${toEmail}: ${info.messageId}`);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error(`❌ Test email failed:`, error);
    return { success: false, error: error.message };
  }
};

/**
 * Send payment rejected email
 */
export const sendPaymentRejectedEmail = async (email, name, membershipId, reason) => {
  try {
    const mailOptions = {
      from: `"SLMA Membership" <${process.env.SMTP_FROM}>`,
      to: email,
      subject: 'Payment Verification Required - SLMA Membership',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Payment Issue</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .alert-box { background: #fee2e2; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #ef4444; }
            .button { display: inline-block; background: #4F46E5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold; }
            .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #666; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Payment Verification Issue</h1>
          </div>
          
          <div class="content">
            <h2>Hello ${name},</h2>
            
            <div class="alert-box">
              <h3 style="margin-top: 0; color: #b91c1c;">⚠️ Payment Receipt Issue</h3>
              <p>We encountered an issue with your payment receipt:</p>
              <p><strong>Reason:</strong> ${reason}</p>
            </div>
            
            <p><strong>Membership ID:</strong> ${membershipId}</p>
            
            <h3>🔄 What to do next:</h3>
            <ol>
              <li>Verify your payment details match our account information</li>
              <li>Ensure the receipt clearly shows the transaction details</li>
              <li>Upload a new receipt or contact support for assistance</li>
            </ol>
            
            <p>Please contact our membership team immediately:</p>
            <ul>
              <li>Email: membership@siltecommunity.org</li>
              <li>Phone: +251 93 067 0088</li>
              <li>Account: CBE 1000212203746 (Sofiya Yasin)</li>
            </ul>
            
            <p style="text-align: center; margin: 30px 0;">
              <a href="${process.env.FRONTEND_URL}/contact" class="button">Contact Support</a>
            </p>
            
            <div class="footer">
              <p>We're here to help you complete your registration successfully.</p>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `Hello ${name},\n\nWe encountered an issue with your payment receipt.\n\nReason: ${reason}\n\nMembership ID: ${membershipId}\n\nPlease:\n1. Verify payment details match our account\n2. Ensure receipt shows transaction details\n3. Upload new receipt or contact support\n\nContact: membership@siltecommunity.org\nPhone: +251 93 067 0088\nAccount: CBE 1000212203746\n\nBest regards,\nSLMA Team`
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`✅ Payment rejected email sent to ${email}: ${info.messageId}`);
    return info;
  } catch (error) {
    console.error(`❌ Error sending payment rejected email to ${email}:`, error);
    throw error;
  }
};