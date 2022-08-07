var axios = require("axios");
var qs = require("qs");

const LoggerToken = process.env.MY_LOGGER_TOKEN;
const UrlLog = process.env.MY_LOGGER_URL_LOG;
const UrlLogDescription = process.env.MY_LOGGER_URL_LOG_DESCRIPTION;
const dev = process.env.DEV;
module.exports.sendLog = async (req, res, next) => {
  if (req.get("User-Agent") == "netnegar") {
    logcode = "netnegar";
    next();
  } else {
    try {
      const data = qs.stringify({
        data: `{"url":"${req.originalUrl}"
                  ,"header":"${req.rawHeaders}"
                  ,"body":"${JSON.stringify(req.body)}"}`,
        ip: req.headers["x-forwarded-for"] || req.socket.remoteAddress,
      });
      const config = {
        method: "post",
        url: UrlLog,
        headers: {
          "x-access-token": LoggerToken,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        data: data,
      };
      const response = await axios(config);
      logcode = response.data.data.logcode;
      next();
    } catch (err) {
      console.log(err);
      next();
    }
  }
};
module.exports.sendLogDescription = async (logcode, status, description) => {
  try {
    if (dev === "false") {
      const data = qs.stringify({
        logcode,
        status,
        description,
      });
      console.log(data)
      const config = {
        method: "post",
        url: UrlLogDescription,
        headers: {
          "x-access-token": LoggerToken,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        data: data,
      };
      await axios(config);
    }
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};
