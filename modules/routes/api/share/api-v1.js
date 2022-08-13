const config = require("../../../config");
const express = require("express");
const file = require("../../../models/file");
const router = express.Router();
// middleware
const apiAdmin = require(`${config.path.middleware}/admin/apiAdmin`);
const apiSuperAdminRegister = require(`${config.path.middleware}/admin/apiSuperAdminRegister`);

//  Controllers
const singleFileController = require('../../../controllers/api/v1/shareController/file/singleController');

//middleware
const apiShare = require('../../middleware/share/apiShare');

///Router
const fileRouter = express.Router();
fileRouter.post('/getFile/:slug' , singleFileController.single.bind(singleFileController) )
router.use("/file" , apiShare , fileRouter);




module.exports = router;
