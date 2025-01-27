// XPLOADER BOT by Tylor

const { y2save } = require('../../lib/y2save.js');
const yts = require('yt-search');

module.exports = {
  command: ['play', 'song'],
  operate: async ({ Xploader, m, reply, text, botname }) => {
    if (!text) return reply('*Please provide a song name!*');

    const query = text;

    const fetchDownloadUrl = async (videoUrl) => {
      try {
        return await y2save.main(videoUrl, 'mp3', '128kbps');
      } catch (error) {
        console.error('Error with y2save:', error.message);
        throw error;
      }
    };

    try {
      const search = await yts(query);
      if (!search || search.all.length === 0) return reply('*The song you are looking for was not found.*');

      const video = search.all[0];
      const downloadUrl = await fetchDownloadUrl(video.url);
      console.log('Final download URL:', downloadUrl);

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