const InitializeController = require("./initializeController");

module.exports = new (class storeController extends InitializeController {
  async store(req, res) {
    req.checkBody("title", "عنوان نمیتواند خالی بماند").notEmpty();
    let values = { title: req.body.title };
    if (this.showValidationErrors(req, res)) return "";
    try {
      await this.model.Tag.create(values);
      return this.ok(res, logcode, "با موفقیت اضافه شد");
    } catch (err) {
      console.log(err);
      return this.abort(res, 500, logcode);
    }
  }
})();
