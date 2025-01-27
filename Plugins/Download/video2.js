// XPLOADER BOT by Tylor

const axios = require('axios');
const yts = require('yt-search');
const { fetchJson } = require('../../lib/myfunc'); // Import fetchJson function

module.exports = {
  command: ['video2'],
  operate: async ({ Xploader, m, reply, text, botname }) => {
    if (!text) return reply('*Please provide a song name!*');

    try {
      // First, search for the video on YouTube
      const search = await yts(text);
      if (!search.all.length) return reply('*The video you are looking for was not found.*');

      const video = search.all[0];
      const videoUrl = video.url;

      // Use Vreden API to download the video
      const response = await fetchJson(`https://api.vreden.web.id/api/ytmp4?url=${encodeURIComponent(videoUrl)}`);
      if (response.status !== 200 || !response.result || !response.result.download || !response.result.download.url) {
        throw new Error('*Failed to retrieve the video!*');
      }

      const data = response.result;

      // Use axios to download the video as a buffer
      const videoResponse = await axios.get(data.download.url, { responseType: 'arraybuffer' });
      const videoBuffer = Buffer.from(videoResponse.data);

      await Xploader.sendMessage(
        m.chat,
        {
          video: videoBuffer,
          mimetype: 'video/mp4',
          fileName: `${data.metadata.title}.mp4`,
          caption: `${data.metadata.title}\n${data.metadata.description}`,
          contextInfo: {
            externalAdReply: {
              title: botname,
              body: `${data.metadata.title}`,
              thumbnailUrl: `${data.metadata.thumbnail}`,
              sourceUrl: `${data.metadata.url}`,
              mediaType: 2,
              mediaUrl: `${data.metadata.thumbnail}`,
            },
          },
        },
        { quoted: m }
      );
      Xploader.sendMessage(m.chat, { react: { text: '✅', key: m.key } });

    } catch (error) {
      console.error('Error in video2 command:', error);
      reply(`Error: ${error.message}`);
    }
  },
};