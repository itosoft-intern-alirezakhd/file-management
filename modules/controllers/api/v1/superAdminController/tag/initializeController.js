const config = require("../../../../../config");
const controller = require(`${config.path.controller}/controller`);

const Tag = require(`${config.path.model}/tag`);

module.exports = class initializeController extends controller {
  constructor() {
    super();
    this.model = { Tag };
  }
};
