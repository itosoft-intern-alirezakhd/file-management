const InitializeController = require("./initializeController");
const mongoose = require("mongoose");




module.exports = new (class indexProduct extends InitializeController {
  async index(req, res) {
    try {
      let query = {};
      let sort = {};
      // tag
      if (req.query.tag) {
        try {
          let tag = JSON.parse(req.query.tag);
          tag.forEach(function (part, index, theArray) {
            theArray[index] = mongoose.Types.ObjectId(theArray[index]);
          });
          query = { ...query, tag: { $in: tag } };
        } catch (err) {
          return this.abort(res, 422, logcode, null, null, "tag");
        }
      }
      sort = { ...sort, _id: -1 };
      ///
      const queryData = [{ $match: query }];
      const aggregateData = [
        {
          $lookup: {
            from: "tags",
            localField: "tag",
            foreignField: "_id",
            as: "tag",
          },
        },
        {
          $project: {
            "tag.__v": 0,
            "tag.updatedAt": 0,
            "tag.createdAt": 0,
          },
        },
      ];
      const result = await this.helper.index(req, "post", queryData, aggregateData, sort);
      if (!result) return this.abort(res, 500, logcode);
      const Transform = await this.helper.transform(result, this.helper.itemTransform, true);
      return this.helper.response(res, null, logcode, 200, Transform);
    } catch (err) {
      console.log(err);
      return this.abort(res, 500, logcode);
    }
  }
})();
