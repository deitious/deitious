
const axios = require('axios');

module.exports = {
  command: ['lyrics'],
  operate: async ({ m, text, Cypher, reply }) => {
    if (!text) return reply(`*Please provide a song name!*`);

    try {
      let response = await axios.get(`https://api.vreden.web.id/api/lirik?lagu=${encodeURIComponent(text)}`);
      if (response.status !== 200 || !response.data.result) throw new Error('Failed to fetch lyrics');

      let lyric = response.data.result;
      await Cypher.sendMessage(m.chat, {
        image: { url: lyric.image },
        caption: `*Title*: ${lyric.title}\n*Artist*: ${lyric.artist}\n\n*Lyrics*:\n${lyric.lyrics}`
      }, { quoted: m });

    } catch (error) {
      console.error(error);
      reply("An error occurred while fetching lyrics.");
    }
  }
};