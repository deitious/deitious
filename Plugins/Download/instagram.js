// XPLOADER BOT by Tylor

const { fetchJson } = require('../../lib/myfunc'); // Import fetchJson function

module.exports = {
  command: ['instagram', 'igdl'],
  operate: async ({ m, text, Xploader, reply }) => {
    if (!text) return reply(`*Please provide an Instagram video url!*`);
    
    try {
      var anu = await fetchJson(`https://api-aswin-sparky.koyeb.app/api/downloader/igdl?url=${text}`);
      var hassdl = anu.data[0].url;
      
      await Xploader.sendMessage(m.chat, {
        video: {
          url: hassdl,
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