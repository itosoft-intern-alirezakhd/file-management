const {body} = require('express-validator/check')

module.exports =  [
    body('title', 'title length should not be empty and max length is 25 character')
    .isLength({
        max : 25
    })
    .not().isEmpty(),
    body('text', 'text should not be empty ')
    .not().isEmpty(),
    
]