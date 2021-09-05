const express = require("express");
const router = express.Router();

const { check, validationResult } = require("express-validator");
const auth = require("../middleware/auth");

const User = require("../models/User");
const Message = require("../models/Message");

// @route      GET api/messages
// @desc       Get all user messages
// @access     Private
router.get("/", auth, async (req, res) => {
  try {
    const messages = await Message.findOne({
      user: req.user.id,
    }).sort({
      date: -1,
    });
    res.json(messages);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      msg: "Server Error",
    });
  }
});

// @route      POST api/messages
// @desc       Add new message
// @access     Private
router.post(
  "/",
  [
    auth,
    [
      check("message", "Please enter the message").not().isEmpty(),
      check("user", "Please enter the userId").not().isEmpty(),
      check("friend", "Please enter the friendId").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({
        errors: errors.array(),
      });
    }

    const { message, user, friend } = req.body;
    try {
      const newMessage = new Message({
        message,
        user,
        friend,
      });
      const messages = await newMessage.save();

      res.json(messages);
    } catch (err) {
      console.log(err.message);
      res.status(500).json({
        msg: "Server Error",
      });
    }
  }
);

// @route      PUT api/messages/:id
// @desc       Update message
// @access     Private
router.put("/:id", auth, async (req, res) => {
  const { message } = req.body;

  // Build message object
  const messageFields = {};
  if (message) messageFields.message = message;

  try {
    let message = await Message.findById(req.params.id);

    if (!message)
      return res.status(404).json({
        msg: "Message not found",
      });

    // Make sure user owns message
    if (message.user.toString() !== req.user.id) {
      return res.status(401).json({
        msg: "Not authorized",
      });
    }

    message = await Message.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          message: messageFields.message,
        },
      },
      {
        new: true,
      }
    );

    res.json(message);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route      DELETE api/messages/:id
// @desc       Delete message
// @access     Private
router.delete("/:id", auth, async (req, res) => {
  try {
    let message = await Message.findById(req.params.id);

    if (!message)
      return res.status(404).json({
        msg: "Message not found",
      });
    console.log(message);
    // Make sure user owns message
    if (message.user.toString() !== req.user.id) {
      return res.status(401).json({
        msg: "Not authorized",
      });
    }

    await Message.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          isDelete: true,
          lastModificationDate: Date.now(),
        },
      },
      {
        new: true,
      }
    );

    res.json({
      msg: "Message removed",
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
