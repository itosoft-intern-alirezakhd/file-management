const InitializeController = require("./initializeController");
const {validationResult} = require('express-validator');
const config = require('../../../../../../config');
const checkValidationErr = require(`${config.path.helper}/checkValidationErr`);

module.exports = new(class registerController extends InitializeController {
  async register(req, res) {

    //check validation
    checkValidationErr(req , res , this)
    try {
      const superAdmin = await this.model.User.findOne({
        email: req.body.email
      }).exec();
      if (superAdmin) return this.abort(res, 422, logcode, "ایمل وارد شده تکراریست", null, "email");
      const values = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        type: "superAdmin",
      };
      await this.model.User.create(values);
      return this.ok(res, logcode, "با موفقیت اضافه شد");
    } catch (err) {
      console.log(err);
      return this.abort(res, 500, logcode);
    }
  }
})();