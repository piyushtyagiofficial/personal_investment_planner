import mongoose from 'mongoose';

const blacklistedTokenSchema = new mongoose.Schema({
  token: { 
    type: String,
    required: true,
    unique: true
  },
  createdAt: { 
    type: Date, 
    default: Date.now, 
    expires: 86400 // Token expires after 1 day (24 hours)
  }
});

export default mongoose.model('BlacklistedToken', blacklistedTokenSchema);
