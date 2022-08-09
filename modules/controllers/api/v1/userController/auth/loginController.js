const InitializeController = require("./initializeController");
const bcrypt = require("bcrypt");
const {
  validationResult
} = require('express-validator/check');
module.exports = new(class loginController extends InitializeController {
  async login(req, res) {
    try {
      const {mobile } = req.body;
      let errors = validationResult(req);
      if (!errors.isEmpty()) {
        return this.showValidationErrors(res, errors.array())
      }
      const user = await this.model.User.findOne({
        mobile
      });
      if (!user) return this.abort(res, 401, null , "user does not exist");
      
      let otp = await this.helper.otpGenerate(user.mobile)
      // await this.helper.sendSms(user.username , user.mobile , otp);
      // const Transform = await this.helper.transform(
      //   user,
      //   this.helper.itemTransform,
      //   false,
      //   admin.type,
      //   req.connection.remoteAddress,
      //   req.get("User-Agent")
      // );
      return this.helper.response(res, "login pending", null, 200, {user , number : user.mobile  , otp : otp.code});
    } catch (err) {
      console.log(err);
      return this.abort(res, 500, logcode);
    }
  }
})();