'use strict';

module.exports = {
  configServerUrl: 'http://121.196.207.240:8084',
  appId: 'node-test-1', // 配置中心命名和项目名称保持一致,
  clusterName: 'default',
  namespaceName: [ 'application', 'python.PostgreSQL', 'python.redis', 'python.ops' ], // 两个namespace相同配置，application配置会覆盖'python.mysql'
};
