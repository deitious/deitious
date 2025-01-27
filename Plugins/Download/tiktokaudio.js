// XPLOADER BOT by Tylor

const { fetchJson } = require('../../lib/myfunc'); // Import fetchJson function

module.exports = {
  command: ['tiktokaudio'],
  operate: async ({ m, args, fetchJson, Xploader, reply }) => {
    if (!args[0]) return reply('*Please provide a TikTok audio url!*');
    
    try {
      let kyuu = await fetchJson(`https://api-aswin-sparky.koyeb.app/api/downloader/tiktok?url=${args[0]}`);
      
      await Xploader.sendMessage(
        m.chat,
        {
          audio: { url: kyuu.data.audio },
          fileName: "tiktok.mp3",
          mimetype: "audio/mpeg",
        },
        { quoted: m }
      );
    } catch (error) {
      reply(`Error fetching audio: ${error.message}`);
    }
  }
};