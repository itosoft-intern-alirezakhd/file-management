const InitializeController = require("./initializeController");
const mongoose = require("mongoose");




module.exports = new (class indexController extends InitializeController {
  async index(req, res) {
    try {
      let query = {userId : req.user._id , isPrivate : false};
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
      //captcha
    //   const response_key = req.body["g-recaptcha-response"];
    //   if(!response_key) return this.abort(res , 200 , null , "response key must be entered");
    //   let response = await this.helper.recaptcha(response_key , req.connection.remoteAddress)    
    //   console.log(response);
    //   if(!response.data.success ){
    //       return this.abort(res , null , 429 , {
    //           success: false ,
    //           message : "failed captcha verification"
    //       })
    //   }


      const result = await this.helper.index(req, "file", queryData, aggregateData, sort);
      console.log(result);
      if (!result) return this.abort(res, 500, null);
      const Transform = await this.helper.transform(result, this.helper.itemTransform, true);
      return this.helper.response(res, "get  files successfully", null, 200, Transform);
    } catch (err) {
      console.log(err);
      return this.abort(res, 500, null);
    }
  }
})();
