// XPLOADER BOT by Tylor

const { getBuffer } = require('../../lib/myfunc');

module.exports = {
  command: ['attp'],
  operate: async ({ Xploader, m, reply, args, prefix, command }) => {
    if (args.length == 0)
      return reply(`Example: ${prefix + command} Tylor`);

    let dgXpBottks2 = args.join(" ");
    try {
      let dgXpBotvuff2 = await getBuffer(`https://api.tioo.eu.org/attp?text=${dgXpBottks2}`);

      await Xploader.sendImageAsSticker(m.chat, dgXpBotvuff2, m, {
        packname: global.packname,
        author: global.author,
      });
    } catch (error) {
      console.error('Error generating sticker:', error);
      reply('An error occurred while generating the sticker.');
    }
  }
};