const config = require("../../../config");
const User = require(`${config.path.model}/user`);
const Token = require(`${config.path.model}/token`);
const { unauthorized, response } = require(`${config.path.helper}/response`);
const { transform } = require(`${config.path.helper}/transform`);
const itemTransform = ["._id", ".firstName", ".lastName", ".email", ".mobile", ".type"];
module.exports = async (req, res) => {
  try {
    const token = await Token.findOne({ token: req.headers["x-access-token"] }).exec();
    if (!token) return unauthorized(res, logcode);
    const user = await User.findById(token.userId).exec();
    if (!user) return unauthorized(res, logcode);
    if (token.liveTime < date) {
      await Token.findByIdAndRemove(token._id).exec();
      return unauthorized(res, logcode);
    } else {
      let values = {};
      const hours = Math.abs(token.liveTime - date) / 36e5;
      if (hours <= 1) {
        let liveTime = token.liveTime;
        liveTime.setHours(liveTime.getHours() + 5);
        values = { ...values, liveTime };
      }
      if (token.lastIp != req.connection.remoteAddress) values = { ...values, lastIp: req.connection.remoteAddress };
      await Token.findByIdAndUpdate(token._id, values).exec();
      const Transform = await transform(user, itemTransform);
      return response(res, null, logcode, 200, Transform);
    }
  } catch (err) {
    return unauthorized(res, logcode);
  }
};
