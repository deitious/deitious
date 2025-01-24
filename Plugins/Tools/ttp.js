// XPLOADER BOT by Tylor

const { getBuffer } = require('../../lib/myfunc');

module.exports = {
  command: ['ttp'],
  operate: async ({ Xploader, m, reply, args, prefix, command }) => {
    if (args.length == 0)
      return reply(`Example: ${prefix + command} Tylor`);

    let dgXpBottks = args.join(" ");
    try {
      let dgXpBotvuff = await getBuffer(`https://api.tioo.eu.org/ttp?text=${dgXpBottks}`);

      await Xploader.sendImageAsSticker(m.chat, dgXpBotvuff, m, {
        packname: global.packname,
        author: global.author,
      });
    } catch (error) {
      console.error('Error generating sticker:', error);
      reply('An error occurred while generating the sticker.');
    }
  }
};