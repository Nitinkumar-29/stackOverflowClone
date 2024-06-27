const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
  profileImage: {
    data: String,
    contentType: String,
    // default: null
  },
  jobTitle: {
    type: String,
    required: false,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  questionCount: {
    type: Number,
    required: true,
    default: 0,
  },
  answerCount: {
    type: Number,
    required: true,
    default: 0,
  },
  address: {
    type: String,
    required: false,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
