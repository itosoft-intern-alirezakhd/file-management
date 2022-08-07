const releasesV = process.env.RELEASES_V;
module.exports.response = async (res, msg, logcode, status, data = null, msgStatus = 100, field = null) => {
  let success = false;
  if (status === 200 || status === 201) success = true;
  return res.status(status).json({
    message: {
      field: field,
      message: msg,
      logcode: logcode,
      status: msgStatus,
    },
    status,
    success,
    data: data || null,
    v: releasesV,
  });
};
module.exports.unauthorized = async (res, logcode) => {
  return res.status(401).json({
    message: {
      field: "token",
      message: "توکن وارد شده صحیح نیست",
      logcode: logcode,
      status: 103,
    },
    status: 401,
    success: false,
    v: releasesV,
  });
};
