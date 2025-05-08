const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn, isOwner, validateMessage } = require("../middleware.js");
const messageController = require("../controllers/message.js");

router
  .route("/")
  .get(isLoggedIn, wrapAsync(messageController.inbox))
  .post(isLoggedIn, validateMessage, wrapAsync(messageController.sendMessage));

router
  .route("/:id")
  .delete(isLoggedIn, isOwner, wrapAsync(messageController.deleteMessage));

module.exports = router;
