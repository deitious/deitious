// XPLOADER-BOT 

module.exports = {
  command: ['modestatus', 'botmode'],
  operate: async ({ Xploader, m, reply, isCreator, mess, modeStatus }) => {
    if (!isCreator) return reply(mess.owner);
    reply(`Current mode: ${modeStatus}`);
  }
};