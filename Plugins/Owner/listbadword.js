// XPLOADER-BOT 

module.exports = {
  command: ['listbadword'],
  operate: async ({ Xploader, m, reply, isCreator, mess, bad }) => {
    if (!isCreator) return reply(mess.owner);
    if (m.isGroup) return reply('This command cannot be used in personal chats.');

    if (bad.length === 0) return reply('No bad words have been added yet.');

    let text = '*Bad Words List:*\n\n';
    bad.forEach((word, index) => {
      text += `${index + 1}. ${word}\n`;
    });

    text += `\nTotal bad words: ${bad.length}`;
    reply(text);
  }
};