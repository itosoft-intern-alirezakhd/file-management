const config = require("../../../../../config");
const Controller = require("../../../../controller");

const User = require(`${config.path.model}/user`);

const { response } = require(`${config.path.helper}/response`);
const { transform } = require(`${config.path.helper}/transform`);
const itemTransform = ["._id", ".firstName", ".lastName" , ".username" ,".mobile" , ".email", ".type"];

module.exports = class initializeController extends Controller {
  constructor() {
    super();
    (this.model = { User }), (this.helper = { response, transform, itemTransform });
  }
};
