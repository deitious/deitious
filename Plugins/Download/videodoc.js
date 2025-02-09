const axios = require('axios');

module.exports = {
  command: ['videodoc'],
  operate: async ({ Cypher, m, reply, text }) => {
    if (!text) return reply('*Please provide a video URL!*');

    const apiUrl = `https://xploader-api.vercel.app/ytmp4?url=${encodeURIComponent(text)}`;
    
    try {
      const response = await axios.get(apiUrl);
      if (!response.data || !response.data.download_url) return reply('*Failed to retrieve the video!*');

      const video = response.data;
      const downloadUrl = video.download_url;

      await Cypher.sendMessage(m.chat, {
        document: { url: downloadUrl },
        mimetype: 'video/mp4',
        fileName: `${video.title}.mp4`
      }, { quoted: m });

    } catch (error) {
      console.error('Error:', error);
      Cypher.sendMessage(m.chat, { text: 'An error occurred while trying to download the video.' }, { quoted: m });
    }
  }
};