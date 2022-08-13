const InitializeController = require("./initializeController");
const bcrypt = require("bcrypt");
const {
  validationResult
} = require('express-validator/check');
module.exports = new(class loginController extends InitializeController {
  async login(req, res) {
    try {
      const {mobile } = req.body;
      req.checkBody('mobile', 'mobile is required').notEmpty().isLength({
        min: 11,
        max: 11
      });
      let errors = req.validationErrors();
      if (errors) {
        return this.showValidationErrors(res, errors)
      }
      const user = await this.model.User.findOne({
        mobile
      });
      if (!user) return this.abort(res, 401, null , "user does not exist");
      
      let otp = await this.helper.otpGenerate(user.mobile)
      let result = await this.helper.sendSms(user.username , user.mobile , otp);
      if(!result) return this.abort(res , null , 500 ,  "error sending sms " )
      
      // const Transform = await this.helper.transform(
      //   user,
      //   this.helper.itemTransform,
      //   false,
      //   admin.type,
      //   req.connection.remoteAddress,
      //   req.get("User-Agent")
      // );
      return this.helper.response(res, "login pending", null, 200, {user , number : user.mobile  });
    } catch (err) {
      console.log(err);
      return this.abort(res, 500, null , err);
    }
  }
})();