# egg-apollojs

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][codecov-image]][codecov-url]
[![David deps][david-image]][david-url]
[![Known Vulnerabilities][snyk-image]][snyk-url]
[![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/egg-apollojs.svg?style=flat-square
[npm-url]: https://npmjs.org/package/egg-apollojs
[travis-image]: https://img.shields.io/travis/eggjs/egg-apollojs.svg?style=flat-square
[travis-url]: https://travis-ci.org/eggjs/egg-apollojs
[codecov-image]: https://img.shields.io/codecov/c/github/eggjs/egg-apollojs.svg?style=flat-square
[codecov-url]: https://codecov.io/github/eggjs/egg-apollojs?branch=master
[david-image]: https://img.shields.io/david/eggjs/egg-apollojs.svg?style=flat-square
[david-url]: https://david-dm.org/eggjs/egg-apollojs
[snyk-image]: https://snyk.io/test/npm/egg-apollojs/badge.svg?style=flat-square
[snyk-url]: https://snyk.io/test/npm/egg-apollojs
[download-image]: https://img.shields.io/npm/dm/egg-apollojs.svg?style=flat-square
[download-url]: https://npmjs.org/package/egg-apollojs

<!--
egg plugin for apollo .support hot patch
-->

## Install

```bash
$ npm i egg-apollojs --save
```

## Usage

```js
// {app_root}/config/plugin.js
exports.apollo = {
  enable: true,
  package: 'egg-apollojs',
};
```

## Configuration

```js
// {app_root}/config/apollo.js
module.exports = {
  configServerUrl: process.env.configServerUrl,
  appId: 'node-test-1', // 配置中心命名和项目名称保持一致,
  clusterName: 'default',
  namespaceName: ['application', 'python.PostgreSQL', 'python.redis', 'python.ops'], // 两个namespace相同配置，application配置会覆盖'python.mysql'
};

```

```js
// {app_root}/preload.js
// 初始化env并存贮
require('egg-apollojs').init(__dirname + '/config/apollo.js');
```

```js
// package.json
// 配置不同的configServerUrl 对应不同的环境
// 开发环境
"dev": "configServerUrl=http://127.0.0.1:8084 node preload.js && configServerUrl=http://127.0.0.1:8084 egg-bin dev"


// 执行npm start 之前设置apollo地址环境变量: configServerUrl=http://127.0.0.1:8084 npm start
//部署环境
"start":"node preload.js &&  eggctl start"
```

```js
// {app_root}/config/config.default.js
'use strict';

// 加载process.env
require('egg-apollojs').apollo.setEnv(); 

module.exports = appInfo => {
  const config = {};
  config.test1 = process.env.test1;
}
```

## Example

<!-- example here -->

## Questions & Suggestions

Please open an issue [here](https://github.com/eggjs/egg/issues).

## License

[MIT](LICENSE)
