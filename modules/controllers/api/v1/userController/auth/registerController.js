const InitializeController = require("./initializeController");
const {
  validationResult
} = require('express-validator/check');

module.exports = new(class registerController extends InitializeController {
  async register(req, res) {
    try {
      const {
        firstName,
        lastName,
        email,
        username,
        password,
        mobile
      } = req.body;
      //check validation
      let errors = validationResult(req);
      if (!errors.isEmpty()) {
        return this.showValidationErrors(res, errors.array())
      }
      const user = await this.model.User.findOne({
        username
      });
      if (user) return this.abort(res, 422, null, "یوزر نیم وارد شده تکراریست", null, "username");
      const values = {
        firstName,
        lastName,
        username,
        email,
        mobile,
        password,
        type: "user"
      };

      const otp = await  this.helper.otpGenerate(values.mobile);
      // await this.helper.sendSms(values.username , values.mobile , otp);
      
      return this.helper.response(res , "کد فعال سازی به کاربر ارسال شد" , null , 200 , {
        values , number  : values.mobile , otp : otp.code
      })

      // let result = await this.model.User.create(values);
      // return this.helper.response(res, "با موفقیت اضافه شد", null, 200, result);
    } catch (err) {
      console.log(err);
      return this.abort(res, 500, null);
    }
  }
})();