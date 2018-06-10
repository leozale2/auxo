#!/usr/bin/env node
const projectName = process.argv.pop();
const fs = require('fs-extra');
const path = require("path");

fs.copy(path.join(__dirname,"template"), projectName, {filter:(src,dist)=>!/node_modules/.test(src)});
