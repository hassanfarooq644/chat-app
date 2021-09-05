const mongoose = require("mongoose");

const UserFriendsSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  friendId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  isBlocked: {
    type: Boolean,
    default: false,
  },
  isPending: {
    type: Boolean,
    default: false,
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

module.exports = mongoose.model("userFriends", UserFriendsSchema);
