const path = require('path')

module.exports = {
  path: {
    controllersApi: {
      v1: {
        user: path.resolve("./modules/controllers/api/v1/userController"),
        admin: path.resolve("./modules/controllers/api/v1/adminController"),
      },
    },
    helper: path.resolve('./modules/helpers'),
    model: path.resolve('./modules/models'),
    middleware: path.resolve('./modules/routes/middleware'),
    controller: path.resolve('./modules/controllers'),
  }
}