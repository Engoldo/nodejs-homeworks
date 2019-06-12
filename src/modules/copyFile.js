const fs = require("fs");
const path = require("path");
const { config } = require("../index");

const copyFile = (base, item) => {
  let outputDirPath = path.join(__dirname, "../../", config.output, item[0]);

  if (!fs.existsSync(outputDirPath)) {
    fs.mkdirSync(outputDirPath);
  }

  fs.copyFileSync(
    path.join(__dirname, "../../", base, item),
    path.join(outputDirPath, item)
  );
  console.log(`Файл ${item} скопирован!`);

  if (config.delete) {
    fs.unlinkSync(path.join(__dirname, "../../", base, item));
    console.log(`Исходный файл ${item} удален!`);
  }
};

module.exports = copyFile;
