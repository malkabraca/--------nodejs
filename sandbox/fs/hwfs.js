const { readdir, unlink, rmdir } = require("fs/promises");
const { join } = require("path");
const hw = async () => {
  let arr, dirsArr;
  try {
    arr = await readdir();
  } catch (err) {}

  for (let dirOrFile of arr) {
    try {
      await rmdir(join(__dirname, "test", "txt2"));
    } catch (err) {
      console.log(err);
      dirsArr = [...dirsArr, dirOrFile];
    }
  }
};
hw();
