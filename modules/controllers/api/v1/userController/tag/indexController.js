const InitializeController = require("./initializeController");
const mongoose = require("mongoose");

module.exports = new (class indexController extends InitializeController {
  async                                                                                                                                                  index(req, res) {
    try {
      let query = {};
      let sort = {};
      sort = { ...sort, _id: -1 };
      //
      const queryData = [{ $match: query }];
      const aggregateData = [];
      const result = await this.helper.index(req, "tag", queryData, aggregateData, sort);
      if (!result) return this.abort(res, 500, logcode);
      const Transform = await this.helper.transform(result, this.helper.itemTransform, true);
      return this.helper.response(res, null, logcode, 200, Transform);
    } catch (err) {
      console.log(err);
      return this.abort(res, 500, logcode);
    }
  }
})();
