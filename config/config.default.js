'use strict';

module.exports = appInfo => {
  console.log('.....加载config');
  const config = {};
  config.appInfo = appInfo;
  config.test1 = process.env.test1;
  return config;
};
