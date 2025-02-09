const axios = require('axios');
const yts = require('yt-search');

module.exports = {
  command: ['playdoc', 'songdoc'],
  operate: async ({ Cypher, m, reply, text, sleep }) => {
    if (!text) return reply('*Please provide a song name!*');

    const query = text;

    const fetchDownloadUrl1 = async (videoUrl) => {
      const apiUrl = `https://api.siputzx.my.id/api/dl/youtube/mp3?url=${videoUrl}`;
      try {
        const response = await axios.get(apiUrl);
        return response.data.data;
      } catch (error) {
        console.error('Error with API1:', error.message);
        throw error;
      }
    };

    const fetchDownloadUrl2 = async (videoUrl) => {
      const format = 'mp3';
      const url = `https://p.oceansaver.in/ajax/download.php?format=${format}&url=${encodeURIComponent(videoUrl)}&api=dfcb6d76f2f6a9894gjkege8a4ab232222`;

      try {
        const response = await axios.get(url, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
          }
        });

        if (!response.data || !response.data.success) throw new Error('Failed to fetch from API2');

        const { id } = response.data;

        while (true) {
          const progress = await axios.get(`https://p.oceansaver.in/ajax/progress.php?id=${id}`, {
            headers: {
              'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
          });

          if (progress.data && progress.data.success && progress.data.progress === 1000) {
            return progress.data.download_url;
          }
          await sleep(5000); // Sleep for 5 seconds before checking again
        }
      } catch (error) {
        console.error('Error with API2:', error.message);
        throw error;
      }
    };

    try {
      const search = await yts(query);
      if (!search || search.all.length === 0) return reply('*The song you are looking for was not found.*');

      const video = search.all[0];

      let downloadUrl;
      try {
        downloadUrl = await fetchDownloadUrl1(video.url);
      } catch (error) {
        console.log('Falling back to second API...');
        downloadUrl = await fetchDownloadUrl2(video.url);
      }

      await Cypher.sendMessage(m.chat, {
        document: { url: downloadUrl },
        mimetype: 'audio/mpeg',
        fileName: `${video.title}.mp3`
      }, { quoted: m });

    } catch (error) {
      console.error('Error:', error);
      Cypher.sendMessage(m.chat, { text: 'An error occurred while trying to download the audio.' }, { quoted: m });
    }
  }
};