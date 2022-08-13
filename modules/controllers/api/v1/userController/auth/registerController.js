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
      req.checkBody('firstName', 'firstName is required').notEmpty();
      req.checkBody('lastName', 'lastName is required').notEmpty();
      req.checkBody('email', 'Email length should not be empty or incorrect format').notEmpty().isEmail();
      req.checkBody('username', 'username is required').notEmpty();
      req.checkBody('password', 'Password length should be 5 to 10 characters  and not empty').notEmpty().isLength({
        min: 5,
        max: 10
      });
      req.checkBody('mobile', 'mobile is required').notEmpty().isLength({
        min: 11,
        max: 11
      });



      let errors = req.validationErrors();
      if (errors) {
        return this.showValidationErrors(res, errors)
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
      let result = await this.helper.sendSms(values.username , values.mobile , otp);
      if(!result) return this.abort(res , null , 500 ,  "error sending sms " )
      return this.helper.response(res , "کد فعال سازی به کاربر ارسال شد" , null , 200 , {
        values , number  : values.mobile 
      })

      // let result = await this.model.User.create(values);
      // return this.helper.response(res, "با موفقیت اضافه شد", null, 200, result);
    } catch (err) {
      console.log(err);
      return this.abort(res, 500, null);
    }
  }
})();