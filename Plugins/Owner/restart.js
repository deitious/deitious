
const { sleep } = require('../../lib/myfunc'); 

module.exports = {
  command: ['restart'],
  operate: async ({ Cypher, m, reply, isCreator, mess }) => {
    if (!isCreator) return reply(mess.owner);
    reply(`*Restarting...*`);
    await sleep(3000);
    process.exit(0);
  }
};