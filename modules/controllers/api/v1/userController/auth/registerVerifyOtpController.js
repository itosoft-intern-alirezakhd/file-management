const InitializeController = require("./initializeController");
const {
    validationResult
} = require('express-validator/check');
const bcrypt = require('bcrypt');
const Otp = require('../../../../../models/otp');

module.exports = new(class VerifyController extends InitializeController {

    async verifyOTP(req, res, next) {
        try {
            const {
                values,
                number,
                otp
            } = req.body;
            if (!number || number.length !== 11) return this.abort(res, 400, null, "number must be entered or 11 character");
            if (!otp) return this.abort(res, 400, null, "otp must be entered");
            if (!values) return this.abort(res, 400, null, "values must be entered");
            //check exist 
            let user = this.model.User.findOne({
                mobile: number
            })
            if (user) return this.abort(res, null, 401, "this user has alreadt exist")
            const optHolder = await Otp.findOne({
                number: number
            });
            if (optHolder.length === 0) return this.abort(res, 400, null, "You use an Expired OTP!")
            const rightOtpFind = optHolder;
            const validUser = await bcrypt.compare(otp, rightOtpFind.otp)
            if (rightOtpFind.number === number && validUser) {
                //create user 
                let user = await this.model.User.create(values)

                await Otp.deleteMany({
                    number: rightOtpFind.number
                })
                const Transform = await this.helper.transform(
                    user,
                    this.helper.itemTransform,
                    false,
                    user.type
                )
                return this.helper.response(res, "register verify Otp successfully", null, 200, Transform)
            } else return this.abort(res, 400, null, "You use an Expired OTP!")
        } catch (error) {
            next(error)
        }
    };
})()