// XPLOADER-BOT by Tylor
const { styletext } = require('../../lib/scraper'); 

module.exports = {
  command: ['fancy', 'styletext'],
  operate: async ({ m, text, Xploader, reply }) => {
    
    if (!text) return reply('*Enter a text!*');
    
    try {
      let anu = await styletext(text);
      let teks = `Styles for ${text}\n\n`;
      
      for (let i of anu) {
        teks += `□ *${i.name}* : ${i.result}\n\n`;
      }
      
      reply(teks);
    } catch (error) {
      console.error(error);
      reply('*An error occurred while fetching fancy text styles.*');
    }
  }
};