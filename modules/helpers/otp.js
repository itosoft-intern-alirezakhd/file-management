const Otp = require('../models/otp-model.js')
const otpGenerator = require('otp-generator')
const bcrypt = require('bcrypt')

exports.otpGenerate = async (number)=>{
    const OTPCode = otpGenerator.generate(6, {
        digits: true,
        lowerCaseAlphabets: false,
        upperCaseAlphabets: false,
        specialChars: false
    })
    const otp = Otp({
        number: number,
        otp: OTPCode
    })
    const salt = await bcrypt.genSalt(10)
    otp.otp = await bcrypt.hash(otp.otp, salt)
    await otp.save()
    console.log(OTPCode)
    const data = {
        code: OTPCode,
        mobileNumber: number
    };

    return data
}

// export const sendOtp = async (_id , number , res)=>{
//     const result = await otpGenerate(number);


//     res.json({
//         status : "Pending",
//         message : "verification code sent",
//         data : {
//             userId : _id ,
//             number : number,
//             otp : result.code
//         }
//     })
// }