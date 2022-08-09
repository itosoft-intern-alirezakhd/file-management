const axios = require("axios");

const recaptchaTest = process.env.RECAPTCHA_TEST;
module.exports.recaptcha = async (response_key, ip) => {
  try {
    const url = process.env.RECAPTCHA_URL;
    const secret = process.env.RECAPTCHA_SECRET;
    const secretTest = process.env.RECAPTCHA_SECRET_TEST;

    const config = {
      method: "post",
      url: `${url}${secretTest}&response=${response_key}&remoteip=${ip}`,
      headers: {},
    };
    const response = await axios(config);
    return response;
  } catch (err) {
    console.log(err);
    return false;
  }
};