const InitializeController = require("./initializeController");
module.exports = new (class singleController extends InitializeController {
  async single(req, res) {
    try {
      req.checkParams("id", "ای دی وارد شده صحیح نیست").isMongoId();
      if (this.showValidationErrors(req, res)) return "";
      const select = "-updatedAt -createdAt -__v";
      const post = await this.model.Post.findById(req.params.id).populate("tag", select).exec();
      if (!post) return this.abort(res, 404, logcode, null, "id");
      const Transform = await this.helper.transform(post, this.helper.itemTransform);
      return this.helper.response(res, null, logcode, 200, Transform);
    } catch (err) {
      console.log(err);
      return this.abort(res, 500, logcode);
    }
  }
})();
