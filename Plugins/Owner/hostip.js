// XPLOADER-BOT 

const https = require('https');

module.exports = {
  command: ['hostip', 'ipbot'],
  operate: async ({ Xploader, m, reply, isCreator, mess }) => {
    if (!isCreator) return reply(mess.owner);

    https.get("https://api.ipify.org", (res) => {
      let data = '';
      res.on("data", (chunk) => data += chunk);
      res.on("end", () => reply("Bot's public IP: " + data));
    });
  }
};