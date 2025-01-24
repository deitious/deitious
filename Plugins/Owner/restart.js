// XPLOADER-BOT 

const { sleep } = require('../../lib/myfunc'); // Import sleep from lib/myfunc

module.exports = {
  command: ['restart'],
  operate: async ({ Xploader, m, reply, isCreator, mess }) => {
    if (!isCreator) return reply(mess.owner);
    reply(`*Restarting...*`);
    await sleep(3000);
    process.exit(0);
  }
};