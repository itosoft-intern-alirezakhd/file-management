const {body} = require('express-validator/check')

module.exports =  [
    body('email', 'Email length should not be empty or incorrect format')
    .isEmail()
    .not().isEmpty(),
    body('firstName', 'Name length should not be empty and max length is 10 characters')
    .not().isEmpty()
    .isLength({
        max : 10
    })
    ,
    body('lastName', 'Name length should not be empty and max length is 10 characters')
    .not().isEmpty()
    .isLength({
        max : 10
    })
    ,
    body('username', 'username should not be empty and max length is 10 characters')
    .not().isEmpty()
    .isLength({
        max : 10
    }),
    body('mobile', 'Mobile number should contains 11 digits and not empty')
    .isLength({
        min: 11,
        max: 11
    })
    .not().isEmpty(),
    body('password', 'Password length should be 5 to 10 characters  and not empty')
    .isLength({
        min: 5,
        max: 10
    })
    .not().isEmpty(),
]