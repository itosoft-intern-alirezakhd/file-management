const config = require("../../../../../../config");
const controller = require(`${config.path.controller}/controller`);

const Post = require(`${config.path.model}/post`);

module.exports = class initializeController extends controller {
  constructor() {
    super();
    this.model = { Post };
  }
};
