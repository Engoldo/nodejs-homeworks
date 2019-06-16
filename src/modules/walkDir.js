const fs = require("fs");
const path = require("path");
const { promisify } = require("util");

const readDir = promisify(fs.readdir);
const fsStat = promisify(fs.stat);

const walkDir = async (base, fileAction, dirAction = () => {}) => {
  try {
    const files = await readDir(base);

    files.forEach(async item => {
      let localBase = path.join(base, item);
      let stat = await fsStat(localBase);

      stat.isDirectory()
        ? walkDir(localBase, fileAction, dirAction)
        : fileAction(base, item);
    });

    dirAction(base);
  } catch (error) {
    console.error(error);
  }
};

module.exports = walkDir;
