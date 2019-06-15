const fs = require("fs");
const path = require("path");

const walkDir = (base, fileAction, dirAction = () => {}) => {
  const files = fs.readdirSync(base);

  files.forEach(item => {
    let localBase = path.join(base, item);
    let stat = fs.statSync(localBase);

    stat.isDirectory()
      ? walkDir(localBase, fileAction, dirAction)
      : fileAction(base, item);
  });

  dirAction(base);
};

module.exports = walkDir;
