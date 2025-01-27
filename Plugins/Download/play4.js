// XPLOADER BOT by Tylor

const { y2save } = require('../../lib/y2save.js'); 
const yts = require('yt-search');
const { fetchJson } = require('../../lib/myfunc'); 

module.exports = {
  command: ['play4', 'song4'],
  operate: async ({ Xploader, m, reply, text, botname }) => {
    if (!text) return reply('*Please provide a song name!*');

    const query = text;

    const fetchDownloadUrl = async (videoUrl) => {
      try {
       
        const response = await fetchJson(`https://api.siputzx.my.id/api/d/ytmp3?url=${encodeURIComponent(videoUrl)}`);
        if (response.status === true && response.data && response.data.dl) {
          return response.data.dl;
        } else {
          throw new Error('New API failed.');
        }
      } catch (error) {
        console.error('Error with the new API:', error.message);

        // Fallback to y2save
        try {
          return await y2save.main(videoUrl, 'mp3', '128kbps');
        } catch (fallbackError) {
          console.error('Error with y2save:', fallbackError.message);
          throw fallbackError;
        }
      }
    };

    try {
      const search = await yts(query);
      if (!search || search.all.length === 0) return reply('*The song you are looking for was not found.*');

      const video = search.all[0];
      const videoUrl = video.url;
      const downloadUrl = await fetchDownloadUrl(videoUrl);
      console.log('Final download URL:', downloadUrl);

      await Xploader.sendMessage(m.chat, {
        audio: { url: downloadUrl },
        mimetype: 'audio/mpeg',
        fileName: `${video.title}.mp3`,
        contextInfo: {
          externalAdReply: {
            title: global.botname,
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