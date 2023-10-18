import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  isAdmin: {
    type: Boolean,
    // required: true,
    default: false,
  },
  forgotPasswordToken: String,
  forgotPasswordExpiry: Date,
});

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
