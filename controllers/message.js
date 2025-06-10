const User = require("../models/user.js");
const Message = require("../models/message.js");

module.exports.inbox = async (req, res) => {
  const messages = await Message.find()
    .populate("sender")
    .sort({ createdAt: 1 });
  const user = req.user;
  res.render("./chatroom/index.ejs", { messages, user });
};

// module.exports.sendMessage = async (req, res) => {
//   const newMsg = new Message(req.body);
//   newMsg.sender = req.user;
//   await newMsg.save();
//   res.redirect(`/inbox`);
// };

// module.exports.deleteMessage = async (req, res, next) => {
//   let { id } = req.params;
//   let deleteMsg = await Message.findByIdAndDelete(id);
//   res.redirect("/inbox");
// };
