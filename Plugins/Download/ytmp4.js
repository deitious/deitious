module.exports = {
  command: ['ytmp4'],
  operate: async ({ Cypher, m, reply, text, fetchVideoDownloadUrl }) => {
    if (!text) return reply('*Please provide a valid YouTube link!*');

    try {
      const urlMatch = text.match(/(?:https?:\/\/)?(?:youtu\.be\/|(?:www\.|m\.)?youtube\.com\/(?:watch\?v=|v\/|embed\/|shorts\/|playlist\?list=)?)([a-zA-Z0-9_-]{11})/gi);
      if (!urlMatch) return reply('*Seems like your message does not contain a valid YouTube link*');

      const link = urlMatch[0];
      const videoData = await fetchVideoDownloadUrl(link);

      await Cypher.sendMessage(m.chat, {
        video: { url: videoData.download_url },
        mimetype: 'video/mp4',
        fileName: `${videoData.title}.mp4`,
        caption: videoData.title
      }, { quoted: m });

    } catch (error) {
      console.error('ytmp4 command failed:', error);
      reply(`Error: ${error.message}`);
    }
  }
};