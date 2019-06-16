const fs = require("fs");
const path = require("path");
const argv = process.argv.slice(2);
const config = {
  input: argv[0] || "./files",
  output: argv[1] || "./result",
  delete: argv[2] || false
};

exports.config = config;

const walkDir = require("./modules/walkDir");
const copyFile = require("./modules/copyFile");
const { promisify } = require("util");

const fsMkDir = promisify(fs.mkdir);
const fsAccess = promisify(fs.access);
const fsUnlink = promisify(fs.unlink);
const fsRmDir = promisify(fs.rmdir);

(async () => {
  try {
    const isOutputExists = await fsAccess(config.output);
    if (isOutputExists) {
      walkDir(
        config.output,
        async (base, item) => {
          await fsUnlink(path.join(base, item));
        },
        async base => {
          await fsRmDir(base);
        }
      );
      console.log(`Старая папка ${config.output} удалена!`);
    }

    await fsMkDir(config.output);
    console.log(`Новая папка ${config.output} создана!`);
    walkDir(
      config.input,
      (base, item) => copyFile(base, item),
      base => config.delete && fs.rmdirSync(base)
    );
  } catch (error) {
    console.log(error);
  }
})();
