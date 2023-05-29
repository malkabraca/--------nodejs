const { writeFile } = require("fs/promises");
const { join } = require("path");

const writeToFile = async () => {
  try {
    await writeFile(join(__dirname, "file.txt"), "1234");
  } catch (err) {
    console.log(err);
  }
};
writeToFile();
