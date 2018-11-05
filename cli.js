#!/usr/bin/env node

var stringify = require("json-stringify-pretty-compact")
var {
  exec
} = require("child_process");

const argv = process.argv;
const isUpdate = argv.includes('-U');
const fs = require('fs-extra');
const path = require("path");
let projectName;
if (isUpdate) {
  projectName = '.';
} else {
  projectName = argv.pop();
}

if (isUpdate) {
  (async () => {
    let projectPath = path.resolve(projectName, 'server');
    if (await fs.pathExists(projectPath)) {
      const {
        dependencies
      } = require("./template/package.json");

      const projectPackagePath = path.resolve(projectName, 'package.json');
      const projectPackageJSON = require(projectPackagePath);

      projectPackageJSON.dependencies = Object.assign({}, projectPackageJSON.dependencies, dependencies);

      fs.writeFileSync(projectPackagePath, stringify(projectPackageJSON));
      exec("npm update", (error, stdout, stderr) => {
        if (error) {
          console.error(`exec error: ${error}`);
          return;
        }
        console.log(`stdout: ${stdout}`);
        console.log(`stderr: ${stderr}`);
      });
    } else {
      console.warn('This is not a valid auxo project!')
    }
  })();
} else {
  fs.copy(path.join(__dirname, "template"), projectName, {
    // filter: (src, dist) => !/node_modules/.test(src)
  });
}
