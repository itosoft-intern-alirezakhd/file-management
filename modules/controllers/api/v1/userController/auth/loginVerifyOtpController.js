const InitializeController = require("./initializeController");
const {
    validationResult
} = require('express-validator/check');
const bcrypt = require('bcrypt');
const Otp = require('../../../../../models/otp');

module.exports = new(class VerifyController extends InitializeController {

    async verifyOTP(req, res, next) {
        try {
            const {number , otp } = req.body
            if(!number || number.length !==11 )return this.abort(res , 400 , null , "number must be entered or 11 character");
            if(!otp)return this.abort(res , 400 , null , "otp must be entered");
            const optHolder = await Otp.findOne({
                number
            });
            if (optHolder.length === 0) return this.abort(res, 400, null, "You use an Expired OTP!")
            const rightOtpFind = optHolder;
            const validUser = await bcrypt.compare(otp, rightOtpFind.otp)
            if (rightOtpFind.number === number && validUser) {
                let user = await this.model.User.findOne({mobile : number});
                if(!user) return this.abort(res , 401, null , "user does not exist")

                // await this.model.User.findByIdAndUpdate(user._id, {
                //     active: true
                // })
                // const roles = await this.model.Role.find({
                //     userRef: user._id
                // })
                await Otp.deleteMany({
                    number: rightOtpFind.number
                })
                const Transform = await this.helper.transform(
                    user,
                    this.helper.itemTransform,
                    false,
                    user.type
                )
                return this.helper.response(res, "login verify Otp successfully", null, 200, Transform)
            } else return this.abort(res, 400, null, "You use an Expired OTP!")
        } catch (error) {
            next(error)
        }
    };
})()