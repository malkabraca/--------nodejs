const { readFile } = require("fs/promises");
const { join } = require("path");

const readToFile = async () => {
  try {
    let data = await readFile(join(__dirname, "file.txt"), {
      encoding: "utf8",
    });
    console.log("data", data);
  } catch (err) {
    console.log(err);
  }
};
readToFile();
