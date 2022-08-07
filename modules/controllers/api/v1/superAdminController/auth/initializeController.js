const config = require("../../../../../config");
const controller = require(`${config.path.controller}/controller`);

const User = require(`${config.path.model}/user`);

const { response } = require(`${config.path.helper}/response`);
const { transform } = require(`${config.path.helper}/transform`);
const itemTransform = ["._id", ".firstName", ".lastName", ".email", ".type"];

module.exports = class initializeController extends controller {
  constructor() {
    super();
    (this.model = { User }), (this.helper = { response, transform, itemTransform });
  }
};
