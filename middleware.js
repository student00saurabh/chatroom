const Message = require("./models/message");
const User = require("./models/user");
const ExpressError = require("./utils/ExpressError.js");
const { messageSchema } = require("./schema.js");

module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.redirectUrl = req.originalUrl;
    req.flash("error", "you are not logedin!");
    return res.redirect("/login");
  }
  next();
};

module.exports.saveRedirectUrl = (req, res, next) => {
  if (req.session.redirectUrl) {
    res.locals.redirectUrl = req.session.redirectUrl;
  }
  next();
};

module.exports.isOwner = async (req, res, next) => {
  let { id } = req.params;
  let msg = await Message.findById(id).populate("sender");
  if (!msg.sender.equals(res.locals.currUser)) {
    req.flash("error", "You can't delete this message!");
    return res.redirect(`/inbox`);
  }
  next();
};

module.exports.validateMessage = (req, res, next) => {
  let { error } = messageSchema.validate(req.body);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};
