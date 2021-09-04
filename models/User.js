const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  surname: {
    type: String,
    require: true,
  },
  username: {
    type: String,
    require: true,
    unique: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
  phone: {
    type: String,
    require: true,
  },
  dob: {
    type: Date,
    default: Date.now,
  },
  photo: {
    type: String,
  },
  creationTime: {
    type: Date,
    default: Date.now,
  },
  lastModificationDate: {
    type: Date,
    default: Date.now,
  },
  isDelete: {
    type: Boolean,
    default: false,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model("user", UserSchema);
