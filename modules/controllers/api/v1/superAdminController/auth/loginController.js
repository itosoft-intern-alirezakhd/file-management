const InitializeController = require("./initializeController");
const bcrypt = require("bcrypt");

module.exports = new (class loginController extends InitializeController {
  async login(req, res) {
    req.checkBody("email", "وارد کردن فیلد ایمیل الزامیست").notEmpty();
    req.checkBody("password", "وارد کردن فیلد پسورد الزامیست").notEmpty();
    if (this.showValidationErrors(req, res)) return "";
    //
    try {
      const superAdmin = await this.model.User.findOne({ email: req.body.email, type: "superAdmin" }).exec();
      if (!superAdmin) return this.abort(res, 401, logcode);
      const match = await bcrypt.compare(req.body.password, superAdmin.password);
      if (!match) return this.abort(res, 401, logcode);
      const Transform = await this.helper.transform(
        superAdmin,
        this.helper.itemTransform,
        false,
        "superAdmin",
        req.connection.remoteAddress,
        req.get("User-Agent")
      );
      return this.helper.response(res, null, logcode, 200, Transform);
    } catch (err) {
      console.log(err);
      return this.abort(res, 500, logcode);
    }
  }
})();
