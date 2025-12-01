import asyncHandler from '../utils/asyncHandler.js';
import User from '../models/User.js';
import generateToken from '../utils/generateToken.js';
import crypto from 'crypto';
import { 
  sendVerificationEmail, 
  sendPasswordResetEmail,
  sendWelcomeEmail 
} from '../services/emailService.js';
import bcrypt from 'bcryptjs';

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
export const register = asyncHandler(async (req, res) => {
  const { name, email, password, phone, zone, language } = req.body;

  // Check if user exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({
      success: false,
      message: 'User already exists',
    });
  }

  // Create verification token
  const verificationToken = crypto.randomBytes(20).toString('hex');

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    phone,
    zone,
    language: language || 'en',
    verificationToken,
  });

  // Generate token
  const token = generateToken(user._id, user.role);

  // Send verification email
  await sendVerificationEmail(user.email, user.name, verificationToken);

  res.status(201).json({
    success: true,
    message: 'Registration successful. Please check your email for verification.',
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      membership: user.membership,
      language: user.language,
    },
  });
});

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Check for user
  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    return res.status(401).json({
      success: false,
      message: 'Invalid credentials',
    });
  }

  // Check if user is active
  if (!user.isActive) {
    return res.status(401).json({
      success: false,
      message: 'Account is deactivated',
    });
  }

  // Check password
  const isPasswordMatch = await bcrypt.compare(password, user.password);

  if (!isPasswordMatch) {
    return res.status(401).json({
      success: false,
      message: 'Invalid credentials',
    });
  }

  // Update last login
  user.lastLogin = new Date();
  await user.save();

  // Generate token
  const token = generateToken(user._id, user.role);

  res.json({
    success: true,
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      membership: user.membership,
      language: user.language,
      emailVerified: user.emailVerified,
    },
  });
});

// @desc    Verify email
// @route   GET /api/auth/verify-email/:token
// @access  Public
export const verifyEmail = asyncHandler(async (req, res) => {
  const { token } = req.params;

  const user = await User.findOne({ verificationToken: token });

  if (!user) {
    return res.status(400).json({
      success: false,
      message: 'Invalid verification token',
    });
  }

  user.emailVerified = true;
  user.verificationToken = undefined;
  await user.save();

  // Send welcome email
  await sendWelcomeEmail(user.email, user.name, user.membership.membershipId);

  res.json({
    success: true,
    message: 'Email verified successfully',
  });
});

// @desc    Forgot password
// @route   POST /api/auth/forgot-password
// @access  Public
export const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'User not found',
    });
  }

  // Generate reset token
  const resetToken = crypto.randomBytes(20).toString('hex');
  
  // Hash token and set to resetPasswordToken field
  user.resetPasswordToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');
  
  // Set expire (1 hour)
  user.resetPasswordExpire = Date.now() + 3600000;

  await user.save();

  // Send email
  await sendPasswordResetEmail(user.email, user.name, resetToken);

  res.json({
    success: true,
    message: 'Password reset email sent',
  });
});

// @desc    Reset password
// @route   PUT /api/auth/reset-password/:token
// @access  Public
export const resetPassword = asyncHandler(async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  // Hash token
  const resetPasswordToken = crypto
    .createHash('sha256')
    .update(token)
    .digest('hex');

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return res.status(400).json({
      success: false,
      message: 'Invalid or expired reset token',
    });
  }

  // Hash new password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Set new password
  user.password = hashedPassword;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  res.json({
    success: true,
    message: 'Password reset successful',
  });
});

// @desc    Get current user
// @route   GET /api/auth/me
// @access  Private
export const getMe = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id).populate('zone');

  res.json({
    success: true,
    user,
  });
});

// @desc    Update user profile
// @route   PUT /api/auth/update-profile
// @access  Private
export const updateProfile = asyncHandler(async (req, res) => {
  const { name, phone, language, profile } = req.body;

  const user = await User.findById(req.user.id);

  if (user) {
    user.name = name || user.name;
    user.phone = phone || user.phone;
    user.language = language || user.language;
    user.profile = { ...user.profile, ...profile };

    const updatedUser = await user.save();

    res.json({
      success: true,
      user: updatedUser,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});