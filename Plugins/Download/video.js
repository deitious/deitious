// XPLOADER BOT by Tylor

const axios = require('axios');
const yts = require('yt-search');

module.exports = {
  command: ['video'],
  operate: async ({ Xploader, m, reply, text }) => {
    if (!text) return reply("Please provide a song/video name.");

    try {
      // Search for the video
      let searchResults = await yts(text);
      let result = searchResults.all[0];
      let videoUrl = `https://api.siputzx.my.id/api/d/ytmp4?url=${encodeURIComponent(result.url)}`;

      // Fetch the direct download link
      let response = await axios.get(videoUrl);
      if (response.status !== 200 || !response.data.status) throw new Error('Failed to retrieve video link');

      let videoInfo = response.data.data;

      // Send video information
      let videoMessage = {
        text: `*Title*: ${videoInfo.title}\n*Channel*: ${result.author.name}\n*Views*: ${result.views}\n*Duration*: ${result.timestamp}\n\n*Xploader is downloading video...*`,
        contextInfo: { mentionedJid: [m.sender] }
      };
      Xploader.sendMessage(m.chat, videoMessage, { quoted: m });

      // Send the video
      await Xploader.sendMessage(m.chat, { 
        video: { url: videoInfo.dl }, 
        mimetype: 'video/mp4', 
        fileName: `${videoInfo.title}.mp4`,
        caption: `᙭ᑭᒪOᗩᗪᗴᖇ ᗷOT`
      }, { quoted: m });

    } catch (error) {
      console.error(error);
      reply("An error occurred while fetching the video.");
    }
  }
};