const InitializeController = require("./initializeController");

module.exports = new (class registerController extends InitializeController {
  async register(req, res) {
    req.checkBody("firstName", "وارد کردن فیلد نام الزامیست").notEmpty();
    req.checkBody("lastName", "وارد کردن فیلد نام خانوادگی الزامیست").notEmpty();
    req.checkBody("email", "وارد کردن فیلد ایمیل الزامیست").notEmpty();
    req.checkBody("password", "وارد کردن فیلد پسورد الزامیست").notEmpty();
    req.checkBody("email", "فرمت اییمل وارد شده صحیح نیست").isEmail();
    if (this.showValidationErrors(req, res)) return "";
    //
    try {
      const superAdmin = await this.model.User.findOne({ email: req.body.email }).exec();
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
