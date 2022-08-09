const InitializeController = require("./initializeController");


module.exports = new(class singleController extends InitializeController {
    async single(req, res) {
        try {
            let slug = req.params.slug;

            if (!slug) return this.abort(res, null, 400, "slug param must be entered");

            let file = await this.model.File.findOne({
                slug
            })
            console.log(file);
            if (!file)
                return this.abort(res, null, 404, "file does not exist");

            const response_key = req.body["g-recaptcha-response"];
            console.log(response_key);
            let response = await this.helper.recaptcha(response_key , req.connection.remoteAddress)    
            console.log(response);
            if(!response.data.success ){
                return this.abort(res , null , 429 , {
                    success: false ,
                    message : "failed captcha verification"
                })
            }
            //check private file and check password
            if (file.isPrivate) {
                let password = req.body.password;
                if(!password || password !== file.password){
                    return this.abort(res, null, 400, "password does not match");
                }    
            }
            //access to file
            const Transform = await this.helper.transform(file, this.helper.itemTransform, false);
            return this.helper.response(res, "get file successfully", null , 200, Transform);
        } catch (err) {
            console.log(err);
            return this.abort(res, 500, null);
        }
    }
})();