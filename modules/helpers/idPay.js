const axios = require("axios");
var qs = require("qs");

const apiKey = process.env.IDPAY_API_KEY;
const urlGetToken = process.env.IDPAY_URL_GET_TOKEN;
const urlVerify = process.env.IDPAY_URL_VERIFY;
const callbackUrl = process.env.FRONT_URL_CALLBACK_TRANSACTION;

module.exports.getToken = async (amount, factorId, customerPhone) => {
  try {
    const data = JSON.stringify({
      order_id: factorId,
      amount: amount,
      name: null,
      phone: customerPhone,
      mail: null,
      desc: null,
      callback: callbackUrl,
    });
    const config = {
      method: "post",
      url: urlGetToken,
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": apiKey,
        "X-SANDBOX": "1",
      },
      data: data,
    };
    const response = await axios(config);
    return response;
  } catch (err) {
    console.log(err);
    return false;
  }
};
module.exports.verify = async (factorId, transId) => {
  try {
    const data = JSON.stringify({
      id: transId,
      order_id: factorId,
    });
    const config = {
      method: "post",
      url: urlVerify,
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": apiKey,
        "X-SANDBOX": "1",
      },
      data: data,
    };
    const response = await axios(config);
    return response;
  } catch (err) {
    console.log(err);
    return false;
  }
};
