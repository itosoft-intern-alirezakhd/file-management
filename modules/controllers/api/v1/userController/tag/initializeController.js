const config = require("../../../../../config");
const controller = require(`${config.path.controller}/controller`);

const Tag = require(`${config.path.model}/tag`);

const { response } = require(`${config.path.helper}/response`);
const { index } = require(`${config.path.helper}/indexAggregate`);
const { transform } = require(`${config.path.helper}/transform`);
const itemTransform = ["._id", ".title"];
module.exports = class initializeController extends controller {
  constructor() {
    super();
    (this.model = { Tag }), (this.helper = { index, response, transform, itemTransform });
  }
};
