// XPLOADER-BOT by Tylor
const { wikimedia } = require('../../lib/scraper'); 

module.exports = {
  command: ['wikimedia'],
  operate: async ({ m, text, Xploader, reply }) => {
    if (!text) return reply('Enter a search query');
    
    try {
      let anumedia = await wikimedia(text);
      let result = anumedia[Math.floor(Math.random() * anumedia.length)];
      await Xploader.sendMessage(
        m.chat,
        {
          caption: `TITLE: ${result.title}\nSOURCE: ${result.source}\nMEDIA URL: ${result.image}`,
          image: { url: result.image },
        },
        { quoted: m }
      );
    } catch (error) {
      console.error(error);
      reply('*An error occurred while fetching the wikimedia result.*');
    }
  }
};