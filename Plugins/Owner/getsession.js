// XPLOADER-BOT 

const fs = require('fs');

module.exports = {
  command: ['getsession'],
  operate: async ({ Xploader, m, reply, isCreator, mess }) => {
    if (!isCreator) return reply(mess.owner);
    reply("*Fetching session file...*");

    if (global.SESSION_ID) {
      Xploader.sendMessage(
        m.chat,
        {
          text: `${global.SESSION_ID}`,
        },
        {
          quoted: m,
        }
      );
    }

    let botxp = fs.readFileSync("./session/creds.json");
    Xploader.sendMessage(
      m.chat,
      {
        document: botxp,
        mimetype: "application/json",
        fileName: "creds.json",
      },
      {
        quoted: m,
      }
    );
  }
};