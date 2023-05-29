const { readdir } = require("fs/promises");

const readDirFunc = async () => {
  try {
    const files = await readdir(__dirname);
    for (const file of files) console.log(file);
  } catch (err) {
    console.error(err);
  }
};
readDirFunc();
