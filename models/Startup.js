// models/Startup.js
import mongoose from 'mongoose';

const StartupSchema = new mongoose.Schema({
  // Section 1: Founder Details
  fullName: {
    type: String,
    required: [true, 'Full Name is required'],
    trim: true,
  },
  profilePicture: {
    type: String, // Store base64-encoded image string
    required: [true, 'Profile Picture is required'],
  },
  nationalId: {
    type: String, // Store base64-encoded image or PDF string
    required: [true, 'National Identity Card is required'],
  },
  email: {
    type: String,
    required: [true, 'Email Address is required'],
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'],
  },
  whatsappNumber: {
    type: String,
    required: [true, 'WhatsApp Number is required'],
    trim: true,
    match: [/^\d{10,15}$/, 'WhatsApp number must be 10-15 digits'],
  },
  whatsappPassword: {
    type: String,
    required: [true, 'WhatsApp Password is required'],
    minlength: [6, 'WhatsApp password must be at least 6 characters'],
  },
  linkedin: {
    type: String,
    trim: true,
    match: [/^https?:\/\/(www\.)?linkedin\.com\/.*$/, 'Please enter a valid LinkedIn URL'],
    default: null,
  },
  district: {
    type: String,
    required: [true, 'District is required'],
    trim: true,
  },
  state: {
    type: String,
    required: [true, 'State or UT is required'],
    enum: [
      'Andaman and Nicobar Islands', 'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar',
      'Chandigarh', 'Chhattisgarh', 'Dadra & Nagar Haveli & Daman & Diu', 'Delhi', 'Goa',
      'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jammu and Kashmir', 'Jharkhand', 'Karnataka',
      'Kerala', 'Ladakh', 'Lakshadweep', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
      'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Puducherry', 'Punjab', 'Rajasthan',
      'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
    ],
  },

  // Section 2: Startup Basics
  startupName: {
    type: String,
    required: [true, 'Startup Name is required'],
    trim: true,
  },
  startupLogo: {
    type: String, // Store base64-encoded image string
    default: null,
  },
  website: {
    type: String,
    trim: true,
    match: [/^https?:\/\/.*$/, 'Please enter a valid URL'],
    default: null,
  },
  industry: {
    type: [String],
    required: [true, 'Startup Industry is required'],
    enum: ['Fintech', 'HealthTech', 'SaaS', 'D2C', 'Web3', 'EdTech', 'Other'],
  },
  foundedYear: {
    type: Number,
    required: [true, 'Founded Year is required'],
    min: [1900, 'Founded year must be after 1900'],
    max: [new Date().getFullYear(), 'Founded year cannot be in the future'],
  },
  teamSize: {
    type: String,
    required: [true, 'Team Size is required'],
    enum: ['1–5', '6–10', '11–50', '50+'],
  },

  // Section 3: What Does Your Startup Do?
  elevatorPitch: {
    type: String,
    required: [true, 'Elevator Pitch is required'],
    trim: true,
    maxlength: [120, 'Elevator Pitch cannot exceed 120 characters'],
  },
  problem: {
    type: String,
    required: [true, 'Problem description is required'],
    trim: true,
    maxlength: [500, 'Problem description cannot exceed 500 characters'],
  },
  offering: {
    type: String,
    required: [true, 'Core Offering is required'],
    trim: true,
    maxlength: [500, 'Core Offering cannot exceed 500 characters'],
  },

  // Section 4: Traction & Credibility
  stage: {
    type: String,
    required: [true, 'Stage of Startup is required'],
    enum: ['Idea', 'MVP', 'Early Revenue', 'Scaling', 'Funded', 'Acquired'],
  },
  traction: {
    type: String,
    required: [true, 'Traction Highlights are required'],
    trim: true,
    maxlength: [500, 'Traction Highlights cannot exceed 500 characters'],
  },
  funding: {
    type: String,
    trim: true,
    default: null,
  },
  fundingVisibility: {
    type: Boolean,
    default: false,
  },

  // Section 5: Partnership & Collaboration Interests
  lookingFor: {
    type: [String],
    required: [true, 'Looking For selection is required'],
    enum: [
      'Co-marketing partners', 'Tech integrations', 'Resellers / channel partners',
      'Pilot users', 'Talent exchange', 'Service bartering', 'Investment / Strategic partnerships',
      'Mentorship / Advisory', 'Other'
    ],
  },
  offer: {
    type: String,
    required: [true, 'What You Offer is required'],
    trim: true,
    maxlength: [500, 'Offer description cannot exceed 500 characters'],
  },
  collaborationTypes: {
    type: [String],
    required: [true, 'Collaboration Types selection is required'],
    enum: ['Revenue-sharing', 'Equity-based', 'Cross-promotion', 'Paid partnerships', 'Volunteer/cause-driven'],
  },

  // Section 6: Contact Preferences
  contactMethod: {
    type: String,
    required: [true, 'Contact Method is required'],
    enum: ['Email', 'Platform Chat', 'LinkedIn', 'WhatsApp', 'Other'],
  },
  availability: {
    type: String,
    trim: true,
    maxlength: [500, 'Availability description cannot exceed 500 characters'],
    default: null,
  },

  // Section 7: Visibility Options
  publicProfile: {
    type: Boolean,
    default: false,
  },
  verifiedOnly: {
    type: Boolean,
    default: false,
  },
  matchNotifications: {
    type: Boolean,
    default: false,
  },

  // Section 8: Final Submission
  terms: {
    type: Boolean,
    required: [true, 'You must agree to the terms of use and data policies'],
  },

  // Additional fields for tracking
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending',
  },
});

// Update `updatedAt` timestamp on document update
StartupSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

// Singleton pattern to prevent model overwrite
const Startup = mongoose.models.Startup || mongoose.model('Startup', StartupSchema);

export default Startup;