const InitializeController = require("./initializeController");
module.exports = new (class updateController extends InitializeController {
  async update(req, res) {
    req.checkParams("id", "ای دی وارد شده صحیح نیست").isMongoId();
    if (this.showValidationErrors(req, res)) return "";
    let values = {};
    if (req.body.title) {
      values = { ...values, title: req.body.title };
    }
    try {
      const tag = await this.model.Tag.findById(req.params.id).exec();
      if (!tag) return this.abort(res, 404, logcode, null, null, "id");
      await this.model.Tag.findByIdAndUpdate(req.params.id, values).exec();
      return this.ok(res, logcode, "با موفقیت اپدیت شد");
    } catch (err) {
      console.log(err);
      return this.abort(res, 500, logcode);
    }
  }
})();
