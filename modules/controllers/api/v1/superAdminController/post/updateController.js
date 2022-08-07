const InitializeController = require("./initializeController");

module.exports = new (class updateController extends InitializeController {
  async update(req, res) {
    req.checkParams("id", "ای دی وارد شده صحیح نیست").isMongoId();
    if (this.showValidationErrors(req, res)) return;
    /// showValidationErrors
    let values = {};
    if (req.body.title) {
      values = { ...values, title: req.body.title };
    }
    if (req.body.tag) {
      let tag = null;
      try {
        tag = JSON.parse(req.body.tag);
        values = { ...values, tag: tag };
      } catch (err) {
        return this.abort(res, 422, logcode, null, null, "tag");
      }
    }
    try {
      const post = await this.model.Post.findById(req.params.id).exec();
      if (!post) return this.abort(res, 404, logcode, null, null, "id");
      await this.model.Post.findByIdAndUpdate(req.params.id, values).exec();
      return this.ok(res, logcode, "با موفقیت اپدیت شد");
    } catch (err) {
      console.log(err);
      return this.abort(res, 500, logcode);
    }
  }
})();
