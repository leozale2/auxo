const path = require("path");
module.exports = {
  webpack: (config, options, webpack) => {
    config.entry.main = './server/index.js';
    config.output.path = path.resolve("./server");
    config.output.filename = 'main.js';
    config.devtool = "source-map";
    return config
  }
}
