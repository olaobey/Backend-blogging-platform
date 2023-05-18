const express = require("express");
const path = require("path");
const cors = require("cors");
const corsOptions = require("../config/corsOptions");
const paginate = require("express-paginate");
const csrf = require("csurf");
const cookieParser = require("cookie-parser");
const Router = require("../src/routes/index");

const csrfProtection = csrf({ cookie: true });
const errorHandler = require("./middleware/errorHandler");

require("dotenv").config();
const app = express();

app.use(cookieParser());

app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.use(paginate.middleware(process.env.LIMIT, process.env.MAX_LIMIT));

app.use("/", express.static(path.join(__dirname, "public")));

app.use("/api/v1", csrfProtection, Router);

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

app.use(errorHandler);

module.exports = app;
