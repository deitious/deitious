
const { fetchJson } = require('../../lib/myfunc');

module.exports = {
  command: ['facebook', 'fbdl'],
  operate: async ({ m, text, Cypher, reply }) => {
    if (!text) return reply(`*Please provide a Facebook video url!*`);
    
    try {
      var anut = await fetchJson(`https://api-aswin-sparky.koyeb.app/api/downloader/fbdl?url=${text}`);
      var hasdl = anut.data[0].url;
      
      await Cypher.sendMessage(m.chat, {
        video: {
          url: hasdl,
          caption: global.botname
        }
      }, {
        quoted: m
      });
    } catch (error) {
      reply(`Error fetching video: ${error.message}`);
    }
  }
};