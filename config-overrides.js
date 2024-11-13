const path = require("path");

module.exports = function override(config) {
  config.resolve.alias = {
    ...config.resolve.alias,
    "@components": path.resolve(__dirname, "src/components"),
    "@pages": path.resolve(__dirname, "src/pages"),
    "@assets": path.resolve(__dirname, "src/assets"),
    "@redux": path.resolve(__dirname, "src/redux"),
    "@hooks": path.resolve(__dirname, "src/hooks"),
    "@utils": path.resolve(__dirname, "src/utils"),
    "@services": path.resolve(__dirname, "src/services"),
    "@constants": path.resolve(__dirname, "src/constants"),
  };
  return config;
};
