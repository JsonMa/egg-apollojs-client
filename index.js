'use strict';

const apollo = require('./lib/apollo');

exports.apollo = apollo;

exports.init = path => {
  const apolloConfig = require(path);

  // 读取携程apollo配置中心，并创建default.env文件
  apollo.remoteConfigServiceSikpCache(apolloConfig).then(bundle => {
    console.log('Config From Apollo:', '\n', bundle);
    Object.assign(bundle, apolloConfig);
    apollo.createEnvFile(bundle);
    apollo.setEnv();
  }).catch(err => {
    console.error('Error From Apollo:'.red, err);
  }).done;

};
