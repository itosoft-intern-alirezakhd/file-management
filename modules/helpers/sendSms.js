const {
    farazSendPattern
} = require("@aspianet/faraz-sms")
const {
    farazCreatePattern
} = require("@aspianet/faraz-sms")

exports.sendSms = async (username , otp) => {


    const samplePattern = `کد : ${otp}`;

    const result = await farazCreatePattern(samplePattern, "توضیحات", false);
    const patternCode = result.data.pattern.code;
    console.log("کد الگوی ساخته شده: ", patternCode);

    // patternCode = متغیر دربرگیرنده کد الگوی تولید و تایید شده
    const sendResult = await farazSendPattern(patternCode, "شماره-گیرنده", "شماره-ارسال-کننده", {
        name: username,
        code : otp
    });

    return sendResult



}