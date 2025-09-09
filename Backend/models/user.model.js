//For user model import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

dotenv.config();

const { Schema } = mongoose;

const userSchema = new Schema({
  fullName: {
    type: String,
    required: true,
    trim: true,
    index: true
  },

  password: {
    type: String,
    required: [true, 'Password is required']
  },

  mobileNumber: {
    type: String,
    required: true,
    unique: true,
    trim: true
  }
}, { timestamps: true });

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Method to compare passwords
userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Method to generate access token
userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      fullName: this.fullName,
      mobileNumber: this.mobileNumber
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    }
  );
};

// Method to generate refresh token
userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      fullName: this.fullName,
      mobileNumber: this.mobileNumber
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY
    }
  );
};

const User = mongoose.model('User', userSchema);

export { User };
