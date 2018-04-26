'use strict';

const Subscription = require('egg').Subscription;
const apollo = require('../../lib/apollo');
const path = require('path');

class Update extends Subscription {
  static get schedule() {
    return {
      interval: '30s',
      type: 'worker',
    };
  }

  // subscribe 是真正定时任务执行时被运行的函数
  async subscribe() {
    const apolloConfig = require(path.join(this.app.config.baseDir, 'config/apollo.js'));

    const result = await apollo.remoteConfigServiceSikpCache(apolloConfig);
    if (result && result.status === 304) {
      this.app.coreLogger.info('apollo 没有更新');
    } else {
      apollo.createEnvFile(result);
      apollo.setEnv();
      const appInfo = this.app.config.appInfo;
      const updateConfig = require(path.join(this.app.config.baseDir, 'config/config.default.js'))(appInfo);
      Object.assign(this.app.config, updateConfig);
      this.app.coreLogger.info(`apollo 更新完成${new Date()}`);
    }
  }
}

module.exports = Update;
