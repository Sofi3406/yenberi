import asyncHandler from '../utils/asyncHandler.js';
import User from '../models/User.js';
import generateToken from '../utils/generateToken.js';
import crypto from 'crypto';
import { 
  sendVerificationEmail, 
  sendPasswordResetEmail,
  sendWelcomeEmail,
  sendPaymentVerificationEmail 
} from '../services/emailService.js';
import bcrypt from 'bcryptjs';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

// ES module fix for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.join(__dirname, '../../uploads/receipts');
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/') || file.mimetype === 'application/pdf') {
    cb(null, true);
  } else {
    cb(new Error('Only images and PDF files are allowed'), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

// @desc    Register user with payment receipt
// @route   POST /api/auth/register
// @access  Public
export const register = asyncHandler(async (req, res, next) => {
  try {
    // Handle file upload first
    upload.single('receipt')(req, res, async function(err) {
      if (err instanceof multer.MulterError) {
        return res.status(400).json({
          success: false,
          message: 'File upload error',
          error: err.message
        });
      } else if (err) {
        return res.status(400).json({
          success: false,
          message: err.message
        });
      }

      try {
        // Parse user data from FormData
        let userData;
        try {
          userData = JSON.parse(req.body.userData || '{}');
        } catch (parseError) {
          // Clean up uploaded file if parsing fails
          if (req.file) {
            fs.unlinkSync(req.file.path);
          }
          return res.status(400).json({
            success: false,
            message: 'Invalid user data format'
          });
        }

        const { name, email, password, phone, woreda, membershipPlan, language } = userData;

        console.log('📝 Registration attempt:', { 
          name: name ? `${name.substring(0, 10)}...` : 'missing', 
          email: email ? `${email.substring(0, 10)}...` : 'missing', 
          phone: phone ? `${phone.substring(0, 6)}...` : 'missing',
          woreda: woreda || 'missing',
          membershipPlan: membershipPlan || 'active'
        });

        // Validate required fields
        if (!name || !email || !password || !phone || !woreda || !membershipPlan) {
          const missingFields = [];
          if (!name) missingFields.push('name');
          if (!email) missingFields.push('email');
          if (!password) missingFields.push('password');
          if (!phone) missingFields.push('phone');
          if (!woreda) missingFields.push('woreda');
          if (!membershipPlan) missingFields.push('membershipPlan');
          
          // Clean up uploaded file if validation fails
          if (req.file) {
            fs.unlinkSync(req.file.path);
          }
          
          return res.status(400).json({
            success: false,
            message: `Missing required fields: ${missingFields.join(', ')}`,
            errors: {
              name: !name ? 'Name is required' : undefined,
              email: !email ? 'Email is required' : undefined,
              password: !password ? 'Password is required' : undefined,
              phone: !phone ? 'Phone is required' : undefined,
              woreda: !woreda ? 'Woreda is required' : undefined,
              membershipPlan: !membershipPlan ? 'Membership plan is required' : undefined,
            }
          });
        }

        // Validate email format
        const emailRegex = /\S+@\S+\.\S+/;
        if (!emailRegex.test(email)) {
          if (req.file) fs.unlinkSync(req.file.path);
          return res.status(400).json({
            success: false,
            message: 'Invalid email format',
            errors: { email: 'Please enter a valid email address' }
          });
        }

        // Check if user exists
        const userExists = await User.findOne({ email: email.toLowerCase() }).session(null);
        if (userExists) {
          if (req.file) fs.unlinkSync(req.file.path);
          return res.status(409).json({
            success: false,
            message: 'User already exists',
            errors: { email: 'Email already registered' }
          });
        }

        // Validate password
        if (password.length < 8) {
          if (req.file) fs.unlinkSync(req.file.path);
          return res.status(400).json({
            success: false,
            message: 'Password must be at least 8 characters',
            errors: { password: 'Password must be at least 8 characters' }
          });
        }

        // Validate membership plan
        const validPlans = ['basic', 'active', 'premium'];
        if (!validPlans.includes(membershipPlan)) {
          if (req.file) fs.unlinkSync(req.file.path);
          return res.status(400).json({
            success: false,
            message: 'Invalid membership plan',
            errors: { membershipPlan: 'Please select a valid membership plan' }
          });
        }

        // Check receipt requirement for paid plans
        if ((membershipPlan === 'active' || membershipPlan === 'premium') && !req.file) {
          return res.status(400).json({
            success: false,
            message: 'Payment receipt is required for paid membership',
            errors: { receipt: 'Please upload your payment receipt' }
          });
        }

        // Create verification token
        const verificationToken = crypto.randomBytes(20).toString('hex');

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Prepare user data
        const userDataToSave = {
          name,
          email: email.toLowerCase(),
          password: hashedPassword,
          phone,
          woreda,
          membershipPlan,
          language: language || 'en',
          verificationToken,
        };

        // Add payment receipt info if file exists
        if (req.file) {
          userDataToSave.payment = {
            receipt: {
              filename: req.file.filename,
              originalName: req.file.originalname,
              path: req.file.path,
              mimetype: req.file.mimetype,
              size: req.file.size,
            },
            method: 'cbe', // Default to CBE
            status: 'pending',
          };
        }

        // Create user
        const user = new User(userDataToSave);
        await user.save({ validateBeforeSave: false });

        console.log('✅ User created successfully with ID:', user._id);

        // Generate token
        const token = generateToken(user._id, user.role);

        // Send verification email
        try {
          if (sendVerificationEmail) {
            await sendVerificationEmail(user.email, user.name, verificationToken);
            console.log('📧 Verification email sent to:', user.email);
          }
        } catch (emailError) {
          console.warn('⚠️ Failed to send verification email:', emailError.message);
        }

        // Send payment verification email for paid members
        if ((membershipPlan === 'active' || membershipPlan === 'premium') && sendPaymentVerificationEmail) {
          try {
            await sendPaymentVerificationEmail(user.email, user.name, membershipPlan, user.membership.membershipId);
            console.log('💰 Payment verification email sent');
          } catch (emailError) {
            console.warn('⚠️ Failed to send payment verification email:', emailError.message);
          }
        }

        // Prepare response
        const userResponse = {
          id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          woreda: user.woreda,
          membershipPlan: user.membershipPlan,
          membership: user.membership,
          role: user.role,
          language: user.language,
          emailVerified: user.emailVerified,
        };

        res.status(201).json({
          success: true,
          message: membershipPlan === 'basic' 
            ? 'Registration successful! Please check your email for verification.'
            : 'Registration successful! Your payment receipt is under review. Please check your email for verification.',
          token,
          user: userResponse,
        });

      } catch (error) {
        // Clean up uploaded file on error
        if (req.file) {
          fs.unlinkSync(req.file.path);
        }
        console.error('🔥 Registration controller error:', error);
        
        // Handle specific errors
        if (error.code === 11000) {
          return res.status(409).json({
            success: false,
            message: 'Email already exists',
            errors: { email: 'Email already registered' }
          });
        }
        
        if (error.name === 'ValidationError') {
          const errors = {};
          Object.keys(error.errors).forEach(key => {
            errors[key] = error.errors[key].message;
          });
          
          return res.status(400).json({
            success: false,
            message: 'Validation failed',
            errors
          });
        }
        
        next(error);
      }
    });
  } catch (error) {
    console.error('🔥 Registration outer error:', error);
    next(error);
  }
});

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
export const login = asyncHandler(async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email and password',
        errors: {
          email: !email ? 'Email is required' : undefined,
          password: !password ? 'Password is required' : undefined,
        }
      });
    }

    // Check for user
    const user = await User.findOne({ email: email.toLowerCase() })
      .select('+password')
      .session(null);

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
        message: 'Account is deactivated. Please contact support.',
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
    await user.save({ validateBeforeSave: false });

    // Generate token
    const token = generateToken(user._id, user.role);

    // Prepare user response
    const userResponse = {
      id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      woreda: user.woreda || 'worabe',
      membershipPlan: user.membershipPlan,
      membership: user.membership,
      role: user.role,
      language: user.language,
      emailVerified: user.emailVerified,
      isActive: user.isActive,
      payment: {
        status: user.payment?.status || 'none',
      }
    };

    res.json({
      success: true,
      token,
      user: userResponse,
    });

  } catch (error) {
    console.error('🔥 Login controller error:', error);
    next(error);
  }
});

// @desc    Verify email
// @route   GET /api/auth/verify-email/:token
// @access  Public
export const verifyEmail = asyncHandler(async (req, res, next) => {
  try {
    const { token } = req.params;

    const user = await User.findOne({ verificationToken: token }).session(null);

    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Invalid or expired verification token',
      });
    }

    user.emailVerified = true;
    user.verificationToken = undefined;
    
    // Update membership status if payment is verified
    if (user.payment?.status === 'verified') {
      user.membership.status = 'active';
    }
    
    await user.save({ validateBeforeSave: false });

    // Send welcome email
    try {
      if (sendWelcomeEmail && user.membership?.membershipId) {
        await sendWelcomeEmail(user.email, user.name, user.membership.membershipId);
      }
    } catch (emailError) {
      console.warn('⚠️ Failed to send welcome email:', emailError.message);
    }

    res.json({
      success: true,
      message: 'Email verified successfully',
    });

  } catch (error) {
    console.error('🔥 Verify email controller error:', error);
    next(error);
  }
});

// @desc    Forgot password
// @route   POST /api/auth/forgot-password
// @access  Public
export const forgotPassword = asyncHandler(async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email address',
      });
    }

    const user = await User.findOne({ email: email.toLowerCase() }).session(null);

    if (!user) {
      return res.json({
        success: true,
        message: 'If an account exists with this email, a password reset link has been sent.',
      });
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(20).toString('hex');
    
    user.resetPasswordToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');
    
    user.resetPasswordExpire = Date.now() + 3600000;

    await user.save({ validateBeforeSave: false });

    // Send email
    try {
      if (sendPasswordResetEmail) {
        await sendPasswordResetEmail(user.email, user.name, resetToken);
        console.log(`✅ Password reset email sent to ${user.email}`);
      }
    } catch (emailError) {
      console.error('Failed to send password reset email:', emailError);
    }

    res.json({
      success: true,
      message: 'If an account exists with this email, a password reset link has been sent.',
    });

  } catch (error) {
    console.error('🔥 Forgot password controller error:', error);
    next(error);
  }
});

// @desc    Reset password
// @route   PUT /api/auth/reset-password/:token
// @access  Public
export const resetPassword = asyncHandler(async (req, res, next) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    if (!password || password.length < 8) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 8 characters',
      });
    }

    const resetPasswordToken = crypto
      .createHash('sha256')
      .update(token)
      .digest('hex');

    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    }).session(null);

    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Invalid or expired reset token',
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    res.json({
      success: true,
      message: 'Password reset successful. You can now login with your new password.',
    });

  } catch (error) {
    console.error('🔥 Reset password controller error:', error);
    next(error);
  }
});

// @desc    Get current user
// @route   GET /api/auth/me
// @access  Private
export const getMe = asyncHandler(async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).session(null);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    res.json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        woreda: user.woreda || 'worabe',
        membershipPlan: user.membershipPlan,
        membership: user.membership,
        role: user.role,
        language: user.language,
        emailVerified: user.emailVerified,
        isActive: user.isActive,
        profile: user.profile,
        payment: {
          status: user.payment?.status || 'none',
        }
      },
    });

  } catch (error) {
    console.error('🔥 Get me controller error:', error);
    next(error);
  }
});

// @desc    Update user profile
// @route   PUT /api/auth/update-profile
// @access  Private
export const updateProfile = asyncHandler(async (req, res, next) => {
  try {
    const { name, phone, language, profile, woreda } = req.body;

    const user = await User.findById(req.user.id).session(null);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    if (name) user.name = name;
    if (phone) user.phone = phone;
    if (language) user.language = language;
    if (profile) user.profile = { ...user.profile, ...profile };
    if (woreda) user.woreda = woreda;

    await user.save({ validateBeforeSave: false });

    const userResponse = {
      id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      woreda: user.woreda || 'worabe',
      membershipPlan: user.membershipPlan,
      membership: user.membership,
      role: user.role,
      language: user.language,
      emailVerified: user.emailVerified,
      isActive: user.isActive,
      profile: user.profile,
    };

    res.json({
      success: true,
      message: 'Profile updated successfully',
      user: userResponse,
    });

  } catch (error) {
    console.error('🔥 Update profile controller error:', error);
    
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: 'Duplicate field value',
      });
    }
    
    next(error);
  }
});

// @desc    Resend verification email
// @route   POST /api/auth/resend-verification
// @access  Public
export const resendVerification = asyncHandler(async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email address',
      });
    }

    const user = await User.findOne({ email: email.toLowerCase() }).session(null);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    if (user.emailVerified) {
      return res.status(400).json({
        success: false,
        message: 'Email already verified',
      });
    }

    const verificationToken = crypto.randomBytes(20).toString('hex');
    user.verificationToken = verificationToken;
    
    await user.save({ validateBeforeSave: false });

    try {
      if (sendVerificationEmail) {
        await sendVerificationEmail(user.email, user.name, verificationToken);
      }
    } catch (emailError) {
      console.error('Failed to send verification email:', emailError);
    }

    res.json({
      success: true,
      message: 'Verification email sent',
    });

  } catch (error) {
    console.error('🔥 Resend verification controller error:', error);
    next(error);
  }
});