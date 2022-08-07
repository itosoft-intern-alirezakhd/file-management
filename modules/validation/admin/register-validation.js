import {
    body
} from 'express-validator'

export default [
    body('email', 'Email length should not be empty or incorrect format')
    .isEmail().
    notEmpty(),
    body('firstName', 'Name length should not be empty and max length is 10 characters')
    .notEmpty()
    .isLength({
        max : 10
    })
    ,
    body('lastName', 'Name length should not be empty and max length is 10 characters')
    .notEmpty()
    .isLength({
        max : 10
    })
    ,
    body('username', 'username should not be empty and max length is 10 characters')
    .notEmpty()
    .isLength({
        max : 10
    }),
    body('mobile', 'Mobile number should contains 10 digits and not empty')
    .isLength({
        min: 10,
        max: 10
    })
    .notEmpty(),
    body('password', 'Password length should be 5 to 10 characters  and not empty')
    .isLength({
        min: 5,
        max: 10
    })
    .notEmpty(),
    body('type', 'type should not be empty')
    .notEmpty()


]