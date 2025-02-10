const yts = require('yt-search');

module.exports = {
  command: ['play'],
  operate: async ({ Cypher, m, reply, text, fetchMp3DownloadUrl }) => {
    if (!text) return reply('*Please provide a song name!*');

    try {
      const search = await yts(text);
      if (!search || search.all.length === 0) return reply('*The song you are looking for was not found.*');

      const video = search.all[0];
      const downloadUrl = await fetchMp3DownloadUrl(video.url);

      await Cypher.sendMessage(m.chat, {
        audio: { url: downloadUrl },
        mimetype: 'audio/mpeg',
        fileName: `${video.title}.mp3`
      }, { quoted: m });

    } catch (error) {
      console.error('play command failed:', error);
      reply(`Error: ${error.message}`);
    }
  }
};