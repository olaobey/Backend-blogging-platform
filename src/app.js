const express = require("express");
const path = require("path");
const cors = require("cors");
const pinoHTTP = require("pino-http");
const logger = require("../src/utils/logger");
const corsOptions = require("../config/corsOptions");
const paginate = require("express-paginate");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const Router = require("../src/routes/index");
const errorHandler = require("./middleware/errorHandler");

require("dotenv").config();

const app = express();

app.use(cookieParser());

app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.use(helmet());

app.use(paginate.middleware(process.env.LIMIT, process.env.MAX_LIMIT));

app.use("/", express.static(path.join(__dirname, "public")));

// Enable XSS Protection
app.use((req, res, next) => {
  res.setHeader("X-XSS-Protection", "1; mode=block");
  next();
});

app.use("/api/v1", Router);

// send back a 404 error for any unknown api request
app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ message: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});

app.use(
  pinoHTTP({
    logger,
  })
);

app.use(errorHandler);

module.exports = app;
