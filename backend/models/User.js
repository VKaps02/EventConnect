import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  _id: String, // Firebase UID
  email: { type: String, required: true },
  isSubscribed: { type: Boolean, default: false },
  subscriptionDate: { type: Date },
});

const User = mongoose.model("User", UserSchema);
export default User;
