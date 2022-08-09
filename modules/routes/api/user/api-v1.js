const config = require("../../../../config");
const express = require("express");
const router = express.Router();

//validation 
//auth
const registerUserValidation = require(`${config.path.validation}/user/auth/register-validation`);
const loginUserValidation = require(`${config.path.validation}/user/auth/login-validation`);
//file
const createfileValidation = require(`${config.path.validation}/user/file/create-validation`)
// middleware
const apiUser = require(`${config.path.middleware}/user/apiUser`)

//  Controllers
const { user: userController } = config.path.controllersApi.v1;
// Controller
//tag
const tagIndexController = require(`${userController}/tag/indexController`);
const tagSingleController = require(`${userController}/tag/singleController`);
//post
const postIndexController = require(`${userController}/post/indexController`);
const postSingleController = require(`${userController}/post/singleController`);
//auth 
const registerController = require('../../../controllers/api/v1/userController/auth/registerController')
const loginController = require('../../../controllers/api/v1/userController/auth/loginController')
const registerVerifyController = require('../../../controllers/api/v1/userController/auth/registerVerifyOtpController');
const loginVerifyController = require('../../../controllers/api/v1/userController/auth/loginVerifyOtpController');
//file 
const createfileController = require('../../../controllers/api/v1/userController/file/createController');
const indexFileController = require('../../../controllers/api/v1/userController/file/indexController');

///Router

//auth 
const authRouter = express.Router();
authRouter.post('/register' , registerUserValidation , registerController.register.bind(registerController) )
authRouter.post('/login' , loginUserValidation  , loginController.login.bind(loginController) );
authRouter.post('/registerVerifyOtp' , registerVerifyController.verifyOTP.bind(registerVerifyController));
authRouter.post('/loginVerifyOtp' , loginVerifyController.verifyOTP.bind(loginVerifyController));
router.use('/auth' , authRouter)

//file 
const fileRouter = express.Router();
fileRouter.post('/create' , createfileValidation ,   createfileController.create.bind(createfileController) )
fileRouter.get('/getAll' , indexFileController.index.bind(indexFileController) )
router.use('/file' ,apiUser  ,  fileRouter);



// tag
const tagRouter = express.Router();
tagRouter.get("/", tagIndexController.index.bind(tagIndexController));
tagRouter.get("/:id", tagSingleController.single.bind(tagSingleController));
router.use("/tag", tagRouter);
// post
const postRouter = express.Router();
postRouter.get("/", postIndexController.index.bind(postIndexController));
postRouter.get("/:id", postSingleController.single.bind(postSingleController));
router.use("/post", postRouter);
//
module.exports = router;
