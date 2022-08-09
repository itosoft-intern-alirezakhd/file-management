const {
    farazSendPattern
} = require("@aspianet/faraz-sms")
const {
    farazSMS
} = require('@aspianet/faraz-sms');

exports.sendSms = async (username , mobile , otp) => {
        farazSMS.init('pOfLsNK8ZG1XPFqQj_kjySpSHX9Cu1kTxoob67E8V-c=');
        await farazSendPattern('jp69a8pvmff7p17', "09371131486", "09115111486", {
            otp
        });
}