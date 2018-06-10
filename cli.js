#!/usr/bin/env node
const argv = process.argv;
const isUpdate = argv.includes('-U');
const projectName = argv.pop();
const fs = require('fs-extra');
const path = require("path");

if(isUpdate){
  
}
const {dependencies} = require("./template/package.json");

(async ()=>{
  let projectPath = path.resolve(projectName,'server');
  if(await fs.pathExists(file)){

  }
})();

fs.copy(path.join(__dirname,"template"), projectName, {filter:(src,dist)=>!/node_modules/.test(src)});
