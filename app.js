const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const expressValidator = require("express-validator");
const rateLimit = require("express-rate-limit");
const cors = require("cors");
const helmet = require("helmet");
const hpp = require("hpp");
const mongoSanitize = require("express-mongo-sanitize");
require("dotenv").config();
const port = process.env.APP_PORT;
const mongodbUrl = process.env.MONGODB_URL.toString();

// const cronjobs = require('');
const dev = process.env.DEV;
const releasesV = process.env.RELEASES_V;
//Locallogger
// if (dev === "false") {
//   const datetime = new Date();
//   const fs = require("fs");
//   const util = require("util");
//   if (!fs.existsSync("./debug")) {
//     fs.mkdirSync("./debug");
//   }
//   const log_file = fs.createWriteStream(__dirname + `/debug/${datetime.toISOString().slice(0, 10)}.log`, {
//     flags: "w",
//   });
//   const log_stdout = process.stdout;
//   console.log = function (d) {
//     //
//     log_file.write(`\n----------${datetime}\n` + util.format(d) + "\n----------");
//     log_file.write(`\n----------${datetime}\n` + util.format(d) + "\n----------");
//   };
// }
//Locallogger

// global.logcode = "0";
// Connect to DB
mongoose.connect(mongodbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log("Connected to Database"));

const corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 100,
});

// app.locals.logcode = "0";
app.use("/public", express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ type: "application/json" }));
// if (dev === "false") {
//   const { sendLog } = require("./modules/helpers/myLogger");
//   app.use(sendLog);
// }

app.use(expressValidator());
app.use(helmet());
app.use(hpp());
app.use(mongoSanitize());
app.use(limiter);

//api-v1
const publicApiV1Router = require("./modules/routes/api/public/api-v1");
const superAdminApiV1Router = require("./modules/routes/api/admin/api-v1");
app.use("/api/v1", publicApiV1Router);
app.use("/api/v1/admin", superAdminApiV1Router);


app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send({
    message: {
      message: "!خطای سرور",
      field: null,
      logcode,
    },
    status: 500,
    success: false,
    v: releasesV,
  });
  next();
});


app.listen(port, () => {
  console.log(`Server is running at Port ${port}`);
  //cronjobs
  // cronjobs();
});
