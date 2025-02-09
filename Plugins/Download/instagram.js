const fetch = require('node-fetch');

module.exports = {
  command: ['instagram', 'igdl'],
  operate: async ({ Cypher, m, reply, text }) => {
    if (!text) return reply('*Please provide an Instagram URL!*');

    const apiUrl = `https://xploader-api.vercel.app/igdl?url=${encodeURIComponent(text)}`;
    
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      if (!data || data.url.length === 0) return reply('*Failed to retrieve the video!*');

      const videoUrl = data.url;
      const title = `Instagram Video`;

      await Cypher.sendMessage(m.chat, {
        video: { url: videoUrl },
        mimetype: 'video/mp4',
        fileName: `${title}.mp4`
      }, { quoted: m });
    } catch (error) {
      console.error('Download command failed:', error);
      m.reply(`Error: ${error.message}`);
    }
  }
};