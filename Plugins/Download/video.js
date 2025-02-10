const yts = require('yt-search');

module.exports = {
  command: ['video'],
  operate: async ({ Cypher, m, reply, text, fetchVideoDownloadUrl }) => {
    if (!text) return reply('*Please provide a song name!*');

    try {
      const search = await yts(text);
      if (!search || search.all.length === 0) return reply('*The song you are looking for was not found.*');

      const video = search.all[0]; 
      const videoData = await fetchVideoDownloadUrl(video.url);

      await Cypher.sendMessage(m.chat, {
        video: { url: videoData.download_url },
        mimetype: 'video/mp4',
        fileName: `${videoData.title}.mp4`,
        caption: videoData.title
      }, { quoted: m });

    } catch (error) {
      console.error('video command failed:', error);
      reply(`Error: ${error.message}`);
    }
  }
};