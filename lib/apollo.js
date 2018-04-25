'use strict';

const urllib = require('urllib');
const assert = require('assert');
const fs = require('fs');
const helper = require('./helper');
const configCache = require('./config.js');

module.exports = {
  // Apollo开放平台接入方式
  remoteConfigService: async config => {
    assert(config, 'param config is required');
    assert(config.token, 'param token is required');
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        authorization: config.token,
      },
      rejectUnauthorized: false,
      contentType: 'json',
      dataType: 'json',
    };
    const res = await urllib.request(helper.getAllConfigFromApolloUri(config), options);
    assert(res.status === 200, 'apollo host unavailable, please contact your administrtor');
    return helper.mergeConfig(res.data);
  },

  // 通过不带缓存的Http接口从Apollo读取配置
  remoteConfigServiceSikpCache: async config => {
    assert(config, 'param config is required');
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
      rejectUnauthorized: false,
      contentType: 'json',
      dataType: 'json',
    };
    config.releaseKey = configCache.releaseKey;
    const URIs = helper.getConfigSkipCacheUri(config);
    const bundle = await Promise.all(URIs.map(uri => urllib.request(uri, options)));
    for (const res of bundle) {
      if (res.status === 304) { // 不用修改
        return res;
      }
      assert(res.status === 200, 'apollo host unavailable, please contact your administrtor');
      if (res.data.namespaceName === 'application') {
        configCache.releaseKey = res.data.releaseKey;
      }
    }
    return helper.mergeConfigurations(bundle);
  },

  // 通过带缓存的Http接口从Apollo读取配置
  remoteConfigServiceFromCache: async config => {
    assert(config, 'param config is required');
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
      rejectUnauthorized: false,
      contentType: 'json',
      dataType: 'json',
    };
    const URIs = helper.getConfigFromCacheUri(config);
    const bundle = await Promise.all(URIs.map(uri => urllib.request(uri, options)));
    for (const res of bundle) {
      assert(res.status === 200, 'apollo host unavailable, please contact your administrtor');
    }
    return helper.mergeConfigurations(bundle);
  },

  // 生成default.env
  createEnvFile: envConfig => {
    if (fs.existsSync(configCache.ENV_FILE_PATH)) {
      fs.unlinkSync(configCache.ENV_FILE_PATH);
    }
    for (const key of Object.keys(envConfig)) {
      fs.appendFileSync(configCache.ENV_FILE_PATH, `${key}=${envConfig[key]}\n`);
    }
  },

  // 注入到process.env
  setEnv: () => {
    try {
      require('dotenv').config({ path: configCache.ENV_FILE_PATH });
    } catch (err) {
      assert(false, err);
    }
  },

  getConfig: () => {
    return configCache;
  },
};
