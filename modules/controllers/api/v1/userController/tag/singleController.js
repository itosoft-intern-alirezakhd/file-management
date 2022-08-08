const InitializeController = require("./initializeController");

module.exports = new (class singleController extends InitializeController {
  async single(req, res) {
    req.checkParams("id", "ای دی وارد شده صحیح نیست").isMongoId();
    if (this.showValidationErrors(req, res)) return;
    try {
      const tag = await this.model.Tag.findById(req.params.id).exec();
      if (!tag) return this.abort(res, 404, logcode, null,null,"id");
      const Transform = await this.helper.transform(tag, this.helper.itemTransform);
      return this.helper.response(res, null, logcode, 200, Transform);
    } catch (err) {
      console.log(err);
      return this.abort(res, 500, logcode);
    }
  }
})();
