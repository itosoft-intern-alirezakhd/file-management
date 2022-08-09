const initializeController = require("./initializeController");
const {validationResult} = require('express-validator/check')
const uniqueSlug = require('unique-slug')


module.exports = new(class CreateController extends initializeController {

    async create(req, res, next) {
        try {
            let {
                title,
                text,
                format = "txt",
                isPrivate = false,
                password = "",
                expire
            } = req.body
            //check validation
            let errors = validationResult(req);
            if (!errors.isEmpty()) {
                return this.showValidationErrors(res, errors.array())
            }
            let userId = req.user._id;
            //generating slug on userid
            var slug = uniqueSlug();
            //check private password     
            if (isPrivate && (!password || password == ""))
                return this.abort(res, 400, null, "password must be entered")
            //create file
            let file = new this.model.File({
                title,
                text,
                isPrivate,
                password,
                expire,
                userId,
                slug
            });
            //saving file
            await file.save();
            //create access link
            let link = process.env.DOMAIN + "/" + slug;
            console.log(link);
            return this.helper.response(res, "create file successfully", null, 200, {
                link
            })
        } catch (err) {
            console.log(err.message);
            return this.abort(res, 500, null);
        }
    }

})();