
const { wikimedia } = require('../../lib/scraper'); 

module.exports = {
  command: ['wikimedia'],
  operate: async ({ m, text, Cypher, reply }) => {
    if (!text) return reply('Enter a search query');
    
    try {
      let wiki = await wikimedia(text);
      let result = wiki[Math.floor(Math.random() * wiki.length)];
      await Cypher.sendMessage(
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