// XPLOADER-BOT by Tylor

const axios = require('axios');

module.exports = {
  command: ['lyrics'],
  operate: async ({ m, text, Xploader, reply }) => {
    if (!text) return reply(`*Please provide a song name!*`);

    try {
      // Fetch lyrics from the API
      let response = await axios.get(`https://api.vreden.web.id/api/lirik?lagu=${encodeURIComponent(text)}`);
      if (response.status !== 200 || !response.data.result) throw new Error('Failed to fetch lyrics');

      let lyric = response.data.result;

      // Send the lyrics with the song image
      await Xploader.sendMessage(m.chat, {
        image: { url: lyric.image },
        caption: `*Title*: ${lyric.title}\n*Artist*: ${lyric.artist}\n\n*Lyrics*:\n${lyric.lyrics}`
      }, { quoted: m });

    } catch (error) {
      console.error(error);
      reply("An error occurred while fetching lyrics.");
    }
  }
};