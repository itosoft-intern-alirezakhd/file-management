const InitializeController = require("./initializeController");

module.exports = new (class storeController extends InitializeController {
  async store(req, res) {
    // showValidationErrors
    req.checkBody("title", "فیلد تایتل نمیتواند خالی باشد").notEmpty();
    req.checkBody("tag", "فیلد تگ نمیتواند خالی بماند").notEmpty();
    if (this.showValidationErrors(req, res)) return;
    let tag = null;
    try {
      tag = JSON.parse(req.body.tag);
    } catch (err) {
      return this.abort(res, 422, logcode, null, null, "tag");
    }
    let values = {
      title: req.body.title,
      tag: tag,
    };
    try {
      await this.model.Post.create(values);
      return this.ok(res, logcode, "با موفقیت ثبت شد");
    } catch (err) {
      console.log(err);
      return this.abort(res, 500, logcode);
    }
  }
})();
