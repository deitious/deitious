// XPLOADER BOT by Tylor

const { Telesticker } = require('../../lib/scraper'); // Import Telesticker function

module.exports = {
  command: ['telesticker', 'telegramsticker'],
  operate: async ({ m, args, Xploader, prefix, command, reply }) => {
    if (args[0] && args[0].match(/(https:\/\/t.me\/addstickers\/)/gi)) {
      try {
        let XpBotresources = await Telesticker(args[0]);
        await reply(`*Sending ${XpBotresources.length} stickers...*`);
        
        if (m.isGroup && XpBotresources.length > 30) {
          await reply("*Number of stickers more than 30, bot will send it in private chat.*");
          for (let i = 0; i < XpBotresources.length; i++) {
            Xploader.sendMessage(m.sender, {
              sticker: { url: XpBotresources[i].url },
            });
          }
        } else {
          for (let i = 0; i < XpBotresources.length; i++) {
            Xploader.sendMessage(m.chat, {
              sticker: { url: XpBotresources[i].url },
            });
          }
        }
      } catch (error) {
        reply(`Error fetching stickers: ${error.message}`);
      }
    } else {
      reply(`*Telegram sticker link?*\nExample: ${prefix + command} https://t.me/addstickers/FriendlyDeath`);
    }
  }
};