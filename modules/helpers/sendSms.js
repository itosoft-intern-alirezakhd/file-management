const {
    farazSendPattern
} = require("@aspianet/faraz-sms")
const {
    farazSMS , farazGetMessageRecipientsStatus
} = require('@aspianet/faraz-sms');
const SENEDER = "09115111486";
const TOKEN = 'pOfLsNK8ZG1XPFqQj_kjySpSHX9Cu1kTxoob67E8V-c='
const PATTERN = 'jp69a8pvmff7p17';

exports.sendSms = async (username, mobile, otp) => {
    try {
        farazSMS.init(TOKEN);
        await farazSendPattern(PATTERN, mobile, SENEDER, {
            otp
        });
    } catch (err) {
        console.log(err);
        return false
    }

}