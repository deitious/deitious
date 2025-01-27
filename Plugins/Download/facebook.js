// XPLOADER BOT by Tylor

const { fetchJson } = require('../../lib/myfunc'); // Import fetchJson function

module.exports = {
  command: ['facebook', 'fbdl'],
  operate: async ({ m, text, Xploader, reply }) => {
    if (!text) return reply(`*Please provide a Facebook video url!*`);
    
    try {
      var anut = await fetchJson(`https://api-aswin-sparky.koyeb.app/api/downloader/fbdl?url=${text}`);
      var hasdl = anut.data[0].url;
      
      await Xploader.sendMessage(m.chat, {
        video: {
          url: hasdl,
          caption: '©𝐗𝐩𝐥𝐨𝐚𝐝𝐞𝐫𝐁𝐨𝐭'
        }
      }, {
        quoted: m
      });
    } catch (error) {
      reply(`Error fetching video: ${error.message}`);
    }
  }
};