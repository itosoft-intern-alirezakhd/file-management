const InitializeController = require("./initializeController");
const {
  validationResult
} = require('express-validator/check');
const config = require('../../../../../../config');
const checkValidationErr = require(`${config.path.helper}/checkValidationErr`);

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
      let errors = validationResult(req);
      if (!errors.isEmpty()) {
        return this.showValidationErrors(res, errors.array())
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