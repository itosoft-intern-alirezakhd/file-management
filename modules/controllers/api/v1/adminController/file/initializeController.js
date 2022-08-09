const config = require("../../../../../../config");
const Controller = require("../../../../controller");

const File = require(`${config.path.model}/file`);

const { response } = require(`${config.path.helper}/response`);
const { transform } = require(`${config.path.helper}/transform`);
const itemTransform = ["._id", ".title", ".text" , ".isPrivate" , ".slug" , ".format" , ".expired" , ".user" ];

module.exports = class initializeController extends Controller {
  constructor() {
    super();
    (this.model = { File }), (this.helper = { response, transform });
  }
};
