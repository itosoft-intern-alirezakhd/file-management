import {
    body
} from 'express-validator'


export default [
    body('username', 'username should not be empty and max length is 10 characters')
    .notEmpty()
    .isLength({
        max : 10
    }),
    body('password', 'Password length should be 5 to 10 characters  and not empty')
    .isLength({
        min: 5,
        max: 10
    })
    .notEmpty(),
]