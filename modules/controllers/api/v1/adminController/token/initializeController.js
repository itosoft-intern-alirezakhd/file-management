const config = require("../../../../../config");
const controller = require(`${config.path.controller}/controller`);

const Token = require(`${config.path.model}/token`);

const { response } = require(`${config.path.helper}/response`);
const { index } = require(`${config.path.helper}/indexAggregate`);
const { transform } = require(`${config.path.helper}/transform`);

const itemTransform = ["._id", ".user", ".liveTime", ".deviceName", ".lastIp", ".updatedAt", ".createdAt"];
module.exports = class initializeController extends controller {
  constructor() {
    super();
    (this.model = { Token }), (this.helper = { index, response, transform, itemTransform });
  }
};
