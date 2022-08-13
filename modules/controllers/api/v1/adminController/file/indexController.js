const InitializeController = require("./initializeController");
const mongoose = require("mongoose");




module.exports = new (class indexController extends InitializeController {
  async index(req, res) {
    try {
      let query = {};
      let sort = {};
      sort = { ...sort, _id: -1 };
      const queryData = [{ $match: query }];
      const aggregateData = [
        {
          $lookup: {
            from: "users",
            localField: "userId",
            foreignField: "_id",
            as: "user",
          },
        },
        {
          $project: {
            "user.__v": 0,
            "user.updatedAt": 0,
            "user.createdAt": 0,
            "password" : 0
          },
        },
      ];
      const result = await this.helper.index(req, "file", queryData, aggregateData, sort);
      if (!result) return this.abort(res, 500, null);
      const Transform = await this.helper.transform(result, this.helper.itemTransform, true);
      return this.helper.response(res, "get  files successfully", null, 200, Transform);
    } catch (err) {
      console.log(err);
      return this.abort(res, 500, null);
    }
  }
})();
