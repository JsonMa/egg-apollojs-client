'use strict';

module.exports = appInfo => {
  const config = {};
  config.appInfo = appInfo;
  config.test1 = process.env.test1;
  return config;
};
