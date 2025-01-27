// XPLOADER BOT by Tylor

const axios = require('axios');
const yts = require('yt-search');

module.exports = {
  command: ['play3'],
  operate: async ({ Xploader, m, reply, text }) => {
    if (!text) return reply("Please provide a song name.");

    try {
      // Search for the video
      let searchResults = await yts(text);
      let result = searchResults.all[0];
      let audioUrl = `https://api.siputzx.my.id/api/d/ytmp3?url=${encodeURIComponent(result.url)}`;

      // Fetch the direct download link
      let response = await axios.get(audioUrl);
      if (response.status !== 200 || !response.data.status) throw new Error('Failed to retrieve audio link');

      let audioInfo = response.data.data;

      // Send audio information
      let audioInfoMessage = {
        text: `*Title*: ${audioInfo.title}\n*Channel*: ${result.author.name}\n*Views*: ${result.views}\n*Duration*: ${result.timestamp}\n\n*Xploader is downloading audio...*`,
        contextInfo: { mentionedJid: [m.sender] }
      };
      Xploader.sendMessage(m.chat, audioInfoMessage, { quoted: m });

      // Send audio
      await Xploader.sendMessage(m.chat, { 
        audio: { url: audioInfo.dl }, 
        mimetype: 'audio/mp4', 
        fileName: `${audioInfo.title}.mp3` 
      }, { quoted: m });

    } catch (error) {
      console.error(error);
      reply("An error occurred while fetching audio.");
    }
  }
};