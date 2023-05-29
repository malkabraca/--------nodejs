var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("../routes/index");
var usersRouter = require("../routes/users");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, "public")));
app.use("/admin", express.static(path.join(__dirname, "admin")));
// app.use("/biz", express.static(path.join(__dirname, "biz")));
// app.use("/regular", express.static(path.join(__dirname, "regular")));

app.use(
  "/mw1",
  (req, res, next) => {
    console.log("middle ware");
    next();
  },
  (req, res, next) => {
    console.log("middle ware");
    next();
  },
  (req, res, next) => {
    console.log("middle ware");
    next();
  },
  (req, res, next) => {
    console.log("middle ware");
    next();
  }
);

app.use("/mw2", (req, res, next) => {
  console.log("middle ware 2");
});

// app.get("/", (req, res) => {
//   //   res.send("response from server");
//   //   res.json("response from server");
//   console.log("headers", req.headers);
//   console.log("qparams", req.query);
//   res.status(404).json("error from server");
//   //   res.sendFile(path.join(__dirname, "Untitled.png"));
// });

app.use("/:id/:name", (req, res, next) => {
  console.log(req.params);
  if (req.params && req.params.name && req.params.name.startsWith("k")) {
    req.user = {
      msg: "ok",
    };
  }
  next();
});

app.get("/:id/:name", (req, res) => {
  console.log("is user exists", req.hasOwnProperty("user"));
  console.log("user", req.user);
  console.log("params", req.params);
  // console.log(req);
});

app.use((req, res, next) => {
  if (req.query && req.query.id && typeof +req.query.id === "number") next();
  else throw new Error("id is not a number or undefined");
});

app.use((error, req, res, next) => {
  console.log("here");
  console.log("error", error);
  if (error) res.json({ msg: "there is an error" });
  else res.json({ msg: "all good" });
});

app.post("/", (req, res) => {
  console.log(req.query);
  console.log(req.headers);
  console.log(req.body);
});

// app.use("/", indexRouter);
// app.use("/users", usersRouter);

module.exports = app;
