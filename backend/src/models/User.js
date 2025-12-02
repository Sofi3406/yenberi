import mongoose from 'mongoose';
import validator from 'validator';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      maxlength: [100, 'Name cannot exceed 100 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, 'Please provide a valid email'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters'],
      select: false,
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
    },
    role: {
      type: String,
      enum: ['member', 'woreda_admin', 'super_admin'],
      default: 'member',
    },
    woreda: {
      type: String,
      required: [true, 'Woreda is required'],
      enum: ['worabe', 'hulbarag', 'sankura', 'alicho', 'silti', 'dalocha', 'lanforo', 'east-azernet-berbere', 'west-azernet-berbere'],
    },
    membership: {
      type: {
        type: String,
        enum: ['general', 'gold', 'executive', null],
        default: null,
      },
      status: {
        type: String,
        enum: ['active', 'expired', 'pending', 'cancelled'],
        default: 'pending',
      },
      membershipId: String,
      startDate: Date,
      endDate: Date,
    },
    profile: {
      bio: String,
      photo: String,
      occupation: String,
      location: String,
    },
    language: {
      type: String,
      enum: ['en', 'am', 'silt'],
      default: 'en',
    },
    emailVerified: {
      type: Boolean,
      default: false,
    },
    verificationToken: String,
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    lastLogin: Date,
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Generate membership ID before saving
userSchema.pre('save', async function(next) {
  if (this.isNew && this.role === 'member') {
    const count = await mongoose.model('User').countDocuments();
    this.membership.membershipId = `SLMA-${new Date().getFullYear()}-${(count + 1).toString().padStart(4, '0')}`;
  }
  next();
});

const User = mongoose.model('User', userSchema);
export default User;