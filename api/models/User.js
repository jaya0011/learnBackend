import mongoose, { Schema } from "mongoose";
const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 3
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  }
}, { timestamps: true });


const User = mongoose.model('User', UserSchema);
export default User
