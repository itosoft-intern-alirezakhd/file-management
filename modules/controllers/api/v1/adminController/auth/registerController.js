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
        mobile,
        type
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
      req.checkBody('type', 'type is required').notEmpty();


      let errors = req.validationErrors();
      if (errors) {
        return this.showValidationErrors(res, errors)
      }
      const admin = await this.model.User.findOne({
        username
      });
      if (admin) return this.abort(res, 422, null, "ایمل وارد شده تکراریست", null, "email");
      const values = {
        firstName,
        lastName,
        username,
        email,
        mobile,
        password,
        type
      };
      let result = await this.model.User.create(values);
      return this.helper.response(res, "با موفقیت اضافه شد", null, 200, result);
    } catch (err) {
      console.log(err);
      return this.abort(res, 500, null);
    }
  }
})();