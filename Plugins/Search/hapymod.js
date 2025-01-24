// XPLOADER-BOT by Tylor

const { happymod } = require("../../lib/scraper2"); 

module.exports = {
  command: ['happymod'],
  operate: async ({ m, text, prefix, command, reply }) => {
    if (!text) return reply(`*Example: ${prefix + command} Subway surfer mod*`);

    try {
      let kat = await happymod(text);
      reply(util.format(kat));
    } catch (error) {
      console.error(error);
      reply('*An error occurred while fetching the HappyMod data.*');
    }
  }
};