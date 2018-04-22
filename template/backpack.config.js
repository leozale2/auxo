module.exports = {
  webpack: (config, options, webpack) => {
    config.entry.main = './server/index.js';
    config.devtool = "source-map";
    return config
  }
}
