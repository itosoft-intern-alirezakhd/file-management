const path = require('path')

module.exports = {
  path: {
    controllersApi: {
      v1: {
        public: path.resolve("./modules/controllers/api/v1/publicController"),
        admin: path.resolve("./modules/controllers/api/v1/adminController"),
      },
    },
    helper: path.resolve('./modules/helpers'),
    model: path.resolve('./modules/models'),
    middleware: path.resolve('./modules/routes/middleware'),
    controller: path.resolve('./modules/controllers'),
    validation : path.resolve('./modules/validation')
  }
}