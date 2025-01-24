// XPLOADER-BOT 

module.exports = {
  command: ['setbio'],
  operate: async ({ Xploader, m, reply, isCreator, mess, prefix, command, text }) => {
    if (!isCreator) return reply(mess.owner);
    if (!text) return reply(`*Text needed*\nExample: ${prefix + command} ${global.botname}`);

    await Xploader.updateProfileStatus(text);
    reply(`*Successfully updated bio to "${text}"*`);
  }
};