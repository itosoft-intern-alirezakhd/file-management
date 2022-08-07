const { sendLogDescription } = require("./myLogger");
module.exports.logDescriptionErr = async (logcode, code, value = null) => {
  try {
    let status = null;
    let description = null;
    //service and webHook find
    if (code == 100) {
      status = 404;
      description = `اطلاعات وارد شده اشتباه است`;
    }

    
    await sendLogDescription(logcode, status, description);
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};
