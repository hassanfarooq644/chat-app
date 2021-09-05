const mongoose = require("mongoose");

const MessageSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  friend: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  message: {
    type: String,
    require: true,
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
});

module.exports = mongoose.model("message", MessageSchema);
