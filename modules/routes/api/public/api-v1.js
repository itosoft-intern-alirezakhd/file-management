const config = require("../../../config");
const express = require("express");
const router = express.Router();
// middleware
//  Controllers
const { public: publicController } = config.path.controllersApi.v1;
// Controller
//tag
const tagIndexController = require(`${publicController}/tag/indexController`);
const tagSingleController = require(`${publicController}/tag/singleController`);
//post
const postIndexController = require(`${publicController}/post/indexController`);
const postSingleController = require(`${publicController}/post/singleController`);
///Router
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
