'use strict';

const apollo = require('./lib/apollo')

module.exports = (path) => {
  const apolloConfig = require(path);

  // 读取携程apollo配置中心，并创建default.env文件
  apollo.remoteConfigServiceSikpCache(apolloConfig).then(bundle => {
    console.log('Config From Apollo:'.green, '\n', bundle);
    apollo.createEnvFile(bundle);
  }).catch(err => {
    console.error('Error From Apollo:'.red, err);
  }).done;

}