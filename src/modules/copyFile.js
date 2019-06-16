const fs = require("fs");
const path = require("path");
const { config } = require("../index");
const { promisify } = require("util");

const fsMkDir = promisify(fs.mkdir);
const fsCopyFile = promisify(fs.copyFile);
const fsStat = promisify(fs.stat);
const fsUnlink = promisify(fs.unlink);

const copyFile = async (base, item) => {
  try {
    let outputDirPath = path.join(__dirname, "../", config.output, item[0]);

    if (!fsStat(outputDirPath)) {
      await fsMkDir(outputDirPath);
    }

    await fsCopyFile(
      path.join(__dirname, "../", base, item),
      path.join(outputDirPath, item)
    );
    console.log(`Файл ${item} скопирован!`);

    if (config.delete) {
      await fsUnlink(path.join(__dirname, "../", base, item));
      console.log(`Исходный файл ${item} удален!`);
    }
  } catch (error) {
    console.error(error);
  }
};

module.exports = copyFile;
