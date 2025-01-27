// XPLOADER BOT by Tylor

const { fetchJson } = require('../../lib/myfunc'); // Import fetchJson function

module.exports = {
  command: ['tiktok', 'tikdl', 'tiktokvideo'],
  operate: async ({ m, args, fetchJson, Xploader, reply }) => {
    if (!args[0]) return reply('*Please provide a TikTok video url!*');
    
    try {
      let kyuu = await fetchJson(`https://api-aswin-sparky.koyeb.app/api/downloader/tiktok?url=${args[0]}`);
      
      await Xploader.sendMessage(
        m.chat,
        {
          caption: `©𝐗𝐩𝐥𝐨𝐚𝐝𝐞𝐫𝐁𝐨𝐭`,
          video: { url: kyuu.data.video },
          fileName: "video.mp4",
          mimetype: "video/mp4",
        },
        { quoted: m }
      );
    } catch (error) {
      reply(`Error fetching video: ${error.message}`);
    }
  }
};