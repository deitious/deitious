// XPLOADER-BOT by Tylor
 const { wallpaper } = require('../../lib/scraper');

module.exports = {
  command: ['wallpaper'],
  operate: async ({ m, text, Xploader, reply }) => {
    if (!text) return reply('Enter a search query');
    
    try {
      let anuwallpep = await wallpaper(text);
      let result = anuwallpep[Math.floor(Math.random() * anuwallpep.length)];
      await Xploader.sendMessage(
        m.chat,
        {
          caption: `TITLE: ${result.title}\nCATEGORY: ${result.type}\nDETAIL: ${result.source}\nMEDIA URL: ${result.image[2] || result.image[1] || result.image[0]}`,
          image: { url: result.image[0] },
        },
        { quoted: m }
      );
    } catch (error) {
      console.error(error);
      reply('*An error occurred while fetching the wallpaper.*');
    }
  }
};