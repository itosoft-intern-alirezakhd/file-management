const axios = require("axios");
var qs = require("qs");

const apiKey = process.env.NEXTPAY_API_KEY;
const urlGetToken = process.env.NEXTPAY_URL_GET_TOKEN;
const urlVerify = process.env.NEXTPAY_URL_VERIFY;

module.exports.nextPayGetToken = async (amount, orderId, customerPhone, callbackUri) => {
  try {
    var data = qs.stringify({
      api_key: apiKey,
      amount: amount,
      order_id: orderId,
      customer_phone: customerPhone,
      callback_uri: callbackUri,
    });
    var config = {
      method: "post",
      url: urlGetToken,
      data: data,
    };
    const response = await axios(config);
    return response;
  } catch (err) {
    console.log(err);
    return false;
  }
};
module.exports.nextPayVerify = async (amount, transId) => {
  try {
    var data = qs.stringify({
      api_key: apiKey,
      amount: amount,
      trans_id: transId,
    });
    var config = {
      method: "post",
      url: urlVerify,
      data: data,
    };
    const response = await axios(config);
    return response;
  } catch (err) {
    console.log(err);
    return false;
  }
};
