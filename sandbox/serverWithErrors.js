const express = require("express");
const app = express();

app.use((req, res, next) => {
  throw new Error("error something");
});

app.use((err, req, res, next) => {
  console.log("err something went wrong");
  res.json({ msg: "err something went wrong" });
});

app.listen(8181, () => {
  console.log(`running on http://localhost:${8181}/`);
});
