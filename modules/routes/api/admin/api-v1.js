const config = require("../../../config");
const express = require("express");
const router = express.Router();
// middleware
const apiAdmin = require(`${config.path.middleware}/admin/apiAdmin`);
const apiSuperAdminRegister = require(`${config.path.middleware}/admin/apiSuperAdminRegister`);

//validation 
const registerAdminValidation = require('../../../controllers/api/v1/adminController/auth/validation/register-validation')


//  Controllers
const {admin: adminController} = config.path.controllersApi.v1;
/// Controller
// auth
const authRegisterController = require(`${adminController}/auth/registerController`);
const authLoginController = require(`${adminController}/auth/loginController`);
// profile
const profileSingleController = require(`${adminController}/profile/singleController`);
//token
const tokenIndexController = require(`${adminController}/token/indexController`);
const tokenLogoutController = require(`${adminController}/token/logoutController`);
const tokenSingleController = require(`${adminController}/token/singleController`);
// tag
const tagStoreController = require(`${adminController}/tag/storeController`);
const tagDestroyController = require(`${adminController}/tag/destroyController`);
const tagUpdateController = require(`${adminController}/tag/updateController`);
//post
const postStoreController = require(`${adminController}/post/storeController`);
const postUpdateController = require(`${adminController}/post/updateController`);
//indexUser
const indexUserController = require(`${adminController}/indexUserController`);
///Router

// tag
const tagRouter = express.Router();
tagRouter.post("/", tagStoreController.store.bind(tagStoreController));
tagRouter.delete("/delete/:id", tagDestroyController.destroy.bind(tagDestroyController));
tagRouter.put("/update/:id", tagUpdateController.update.bind(tagUpdateController));
router.use("/tag", apiAdmin, tagRouter);

// profile
const profileRouter = express.Router();
profileRouter.get("/", profileSingleController.single.bind(profileSingleController));
router.use("/profile", apiAdmin, profileRouter);

// post
const postRouter = express.Router();
postRouter.post("/", postStoreController.store.bind(postStoreController));
postRouter.put("/:id", postUpdateController.update.bind(postUpdateController));
router.use("/post", apiAdmin, postRouter);

// token
const tokenRouter = express.Router();
tokenRouter.get("/", tokenIndexController.index.bind(tokenIndexController));
tokenRouter.get("/single/:id", tokenSingleController.single.bind(tokenSingleController));
tokenRouter.delete("/logout", tokenLogoutController.logout.bind(tokenLogoutController));
router.use("/session", apiAdmin, tokenRouter);

// auth
const authRouter = express.Router();
authRouter.post("/register"  , apiSuperAdminRegister , authRegisterController.register.bind(authRegisterController));
authRouter.post("/login", authLoginController.login.bind(authLoginController));
router.use("/auth", authRouter);

// indexUser
const indexUserRouter = express.Router();
indexUserRouter.get("/getAllUser", indexUserController.index.bind(indexUserController));
router.use("/", apiAdmin, indexUserRouter);
module.exports = router;
