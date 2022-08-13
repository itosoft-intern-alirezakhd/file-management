const InitializeController = require("./initializeController");
const bcrypt = require("bcrypt");
const {
  validationResult
} = require('express-validator/check');
module.exports = new(class loginController extends InitializeController {
  async login(req, res) {
    try {
      const {username , password } = req.body;

      //check validation
      req.checkBody('username', 'username is required').notEmpty();
      req.checkBody('password', 'Password length should be 5 to 10 characters  and not empty').notEmpty().isLength({
        min: 5,
        max: 10
      });
      let errors = req.validationErrors();
      if (errors) {
        return this.showValidationErrors(res, errors)
      }
      const admin = await this.model.User.findOne({
        username,
        type : {$in : ["superAdmin" , "admin" ]}
      });
      if (!admin) return this.abort(res, 401, null , "admin does not exist");
      const match = await bcrypt.compare(password, admin.password);
      if (!match) return this.abort(res, 401, null , 'password is wrong');
      const Transform = await this.helper.transform(
        admin,
        this.helper.itemTransform,
        false,
        admin.type,
        req.connection.remoteAddress,
        req.get("User-Agent")
      );
      return this.helper.response(res, "login successfully", null, 200, Transform);
    } catch (err) {
      console.log(err);
      return this.abort(res, 500, logcode);
    }
  }
})();