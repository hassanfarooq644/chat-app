const express = require("express");
const router = express.Router();

// @route      GET api/messages
// @desc       Get all user messages
// @access     Private
router.get("/", (req, res) => {
  res.send("Get all messages");
});

// @route      POST api/messages
// @desc       Add new message
// @access     Private
router.post("/", (req, res) => {
  res.send("Add message");
});

// @route      PUT api/messages/:id
// @desc       Update message
// @access     Private
router.put("/:id", (req, res) => {
  res.send("Update message");
});

// @route      DELETE api/messages/:id
// @desc       Delete message
// @access     Private
router.delete("/:id", (req, res) => {
  res.send("Delete  message");
});

module.exports = router;
