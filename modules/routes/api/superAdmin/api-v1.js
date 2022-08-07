const config = require("../../../config");
const express = require("express");
const router = express.Router();
// middleware
const apiSuperAdmin = require(`${config.path.middleware}/superAdmin/apiSuperAdmin`);
const apiSuperAdminRegister = require(`${config.path.middleware}/superAdmin/apiSuperAdminRegister`);
//  Controllers
const { superAdmin: superAdminController } = config.path.controllersApi.v1;
/// Controller
// auth
const authRegisterController = require(`${superAdminController}/auth/registerController`);
const authLoginController = require(`${superAdminController}/auth/loginController`);
// profile
const profileSingleController = require(`${superAdminController}/profile/singleController`);
//token
const tokenIndexController = require(`${superAdminController}/token/indexController`);
const tokenLogoutController = require(`${superAdminController}/token/logoutController`);
const tokenSingleController = require(`${superAdminController}/token/singleController`);
// tag
const tagStoreController = require(`${superAdminController}/tag/storeController`);
const tagDestroyController = require(`${superAdminController}/tag/destroyController`);
const tagUpdateController = require(`${superAdminController}/tag/updateController`);
//post
const postStoreController = require(`${superAdminController}/post/storeController`);
const postUpdateController = require(`${superAdminController}/post/updateController`);
//indexUser
const indexUserController = require(`${superAdminController}/indexUserController`);
///Router
// tag
const tagRouter = express.Router();
tagRouter.post("/", tagStoreController.store.bind(tagStoreController));
tagRouter.delete("/delete/:id", tagDestroyController.destroy.bind(tagDestroyController));
tagRouter.put("/update/:id", tagUpdateController.update.bind(tagUpdateController));
router.use("/tag", apiSuperAdmin, tagRouter);
// profile
const profileRouter = express.Router();
profileRouter.get("/", profileSingleController.single.bind(profileSingleController));
router.use("/profile", apiSuperAdmin, profileRouter);
// post
const postRouter = express.Router();
postRouter.post("/", postStoreController.store.bind(postStoreController));
postRouter.put("/:id", postUpdateController.update.bind(postUpdateController));
router.use("/post", apiSuperAdmin, postRouter);
// token
const tokenRouter = express.Router();
tokenRouter.get("/", tokenIndexController.index.bind(tokenIndexController));
tokenRouter.get("/single/:id", tokenSingleController.single.bind(tokenSingleController));
tokenRouter.delete("/logout", tokenLogoutController.logout.bind(tokenLogoutController));
router.use("/session", apiSuperAdmin, tokenRouter);
// auth
const authRouter = express.Router();
authRouter.post("/register", apiSuperAdminRegister , authRegisterController.register.bind(authRegisterController));
authRouter.post("/login", authLoginController.login.bind(authLoginController));
router.use("/auth", authRouter);
// indexUser
const indexUserRouter = express.Router();
indexUserRouter.get("/getAllUser", indexUserController.index.bind(indexUserController));
router.use("/", apiSuperAdmin, indexUserRouter);
module.exports = router;
