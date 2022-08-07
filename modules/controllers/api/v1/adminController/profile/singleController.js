const InitializeController = require("./initializeController");
module.exports = new (class singleController extends InitializeController {
  async single(req, res) {
    try {
      let superAdmin = null;
      if (req.query.userId) {
        req.checkQuery("userId", "ای دی وارد شده صحیح نیست").isMongoId();
        if (this.showValidationErrors(req, res)) return;
        superAdmin = await this.model.User.findOne({ _id: req.query.userId, type: "superAdmin" }).exec();
        if (!superAdmin) return this.abort(res, 404, logcode, "ایدی وارد شده اشتباه است",null,  "userId");
      } else {
        superAdmin = req.user;
      }
      const Transform = await this.helper.transform(superAdmin, this.helper.itemTransform);
      return this.helper.response(res, null, logcode, 200, Transform);
    } catch (err) {
      console.log(err);
      return this.abort(res, 500, logcode);
    }
  }
})();
