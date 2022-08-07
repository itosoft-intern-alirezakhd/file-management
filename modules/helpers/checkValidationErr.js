const {validationResult} = require('express-validator/check');

module.exports =  async (req , res  , controller) =>{
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      return controller.showValidationErrors(res, errors.array())
    }
}