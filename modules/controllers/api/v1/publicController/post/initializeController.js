const config = require("../../../../../config");
const controller = require(`${config.path.controller}/controller`);

const Post = require(`${config.path.model}/post`);

const { response } = require(`${config.path.helper}/response`);
const { index } = require(`${config.path.helper}/indexAggregate`);
const { transform } = require(`${config.path.helper}/transform`);
const itemTransform = ["._id", ".title", ".tag"];
module.exports = class initializeController extends controller {
  constructor() {
    super();
    (this.model = { Post }), (this.helper = { index, response, transform, itemTransform });
  }
};
