const { mkdir } = require("fs/promises");
const { join } = require("path");

const createNewDir = async () => {
  try {
    await mkdir(join(__dirname, "test", "test2", "test3", "test4"), {
      recursive: true,
    });
  } catch (err) {
    console.log("err", err);
  }
};
createNewDir();
