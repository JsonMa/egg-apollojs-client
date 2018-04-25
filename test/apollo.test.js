'use strict';


const mm = require('egg-mock');
mm.consoleLevel('DEBUG');
console.log('>>>>>', require.main.filename);

it('should schedule work fine', async () => {
  const app = mm.app();
  await app.ready();
  await app.runSchedule('update_apollo');

  return;
});
