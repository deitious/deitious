// XPLOADER BOT by Tylor

const { fetchJson } = require('../../lib/myfunc'); 

module.exports = {
  command: ['play5', 'song5'],
  operate: async ({ Xploader, m, reply, text, botname }) => {
    if (!text) return reply('*Please provide a song name!*');

    const query = text;

    const fetchDownloadUrl = async (songName) => {
      try {
        const response = await fetchJson(`https://api.vreden.web.id/api/ytplaymp3?query=${encodeURIComponent(songName)}`);
        if (response.status === 200 && response.result && response.result.download && response.result.download.status) {
          return response.result.download.url;
        } else {
          throw new Error('Vreden API failed.');
        }
      } catch (error) {
        console.error('Error with Vreden API:', error.message);
        throw error;
      }
    };

    try {
      const downloadUrl = await fetchDownloadUrl(query);
      console.log('Final download URL:', downloadUrl);

      const response = await fetchJson(`https://api.vreden.web.id/api/ytplaymp3?query=${encodeURIComponent(query)}`);
      const video = response.result.metadata;

      await Xploader.sendMessage(m.chat, {
        audio: { url: downloadUrl },
        mimetype: 'audio/mpeg',
        fileName: `${video.title}.mp3`,
        contextInfo: {
          externalAdReply: {
            title: botname,
            body: `${video.title}`,
            thumbnailUrl: `${video.thumbnail}`,
            sourceUrl: `${video.url}`,
            mediaType: 2,
            mediaUrl: `${video.thumbnail}`
          }
        }
      }, { quoted: m });

    } catch (error) {
      console.error('Error:', error);
      Xploader.sendMessage(m.chat, { text: 'An error occurred while trying to download the audio.' }, { quoted: m });
    }
  }
};