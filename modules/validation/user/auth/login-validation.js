const {body} = require('express-validator/check')

module.exports =  [
    body('mobile', 'Mobile number should contains 11 digits and not empty')
    .isLength({
        min: 11,
        max: 11
    })
    .not().isEmpty(),
    
]