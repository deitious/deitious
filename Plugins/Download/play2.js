// XPLOADER BOT by Tylor

const axios = require('axios');
const yts = require('yt-search');
const { fetchJson } = require('../../lib/myfunc'); // Import fetchJson function

module.exports = {
  command: ['play2', 'song2'],
  operate: async ({ Xploader, m, reply, text, botname, sleep }) => {
    if (!text) return reply('*Please provide a song name!*');

    const query = text;

    try {
      const search = await yts(query);
      if (!search || search.all.length === 0) return reply('*The song you are looking for was not found.*');

      const video = search.all[0];
      const format = 'mp3';
      const url = `https://p.oceansaver.in/ajax/download.php?format=${format}&url=${encodeURIComponent(video.url)}&api=dfcb6d76f2f6a9894gjkege8a4ab232222`;

      const response = await axios.get(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
      });

      if (!response.data || !response.data.success) return reply('*Failed to download audio.*');

      const { id, title, info } = response.data;
      const { image } = info;

      while (true) {
        const progress = await axios.get(`https://p.oceansaver.in/ajax/progress.php?id=${id}`, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
          }
        });

        if (progress.data && progress.data.success && progress.data.progress === 1000) {
          const downloadUrl = progress.data.download_url;

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
          break;
        }
        await sleep(5000); // Sleep for 5 seconds before checking again
      }
    } catch (error) {
      console.error('Error:', error);
      Xploader.sendMessage(m.chat, { text: 'An error occurred while trying to download the audio.' }, { quoted: m });
    }
  }
};