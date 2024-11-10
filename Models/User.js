const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: [3, "User name must consist of at least 3 letters"],
    required: [true, "User name is required"],
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    required: [true, "Email is required"],
    validate: [validator.isEmail, "Please provide a valid email address"],
  },
  phone: {
    type: String,
    unique: true,
    required: [true, "Phone number is required"],
    validate: [validator.isMobilePhone, "Please provide a valid phone number"],
  },
  password: {
    type: String,
    minlength: [8, "The password must contain at least 8 characters"],
    required: [true, "Password is required"],
    select: false,
  },
});

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

const User = mongoose.model("user", UserSchema);
module.exports = User;
