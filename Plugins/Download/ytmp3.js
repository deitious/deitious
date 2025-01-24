// XPLOADER BOT by Tylor

module.exports = {
  command: ['ytmp3'],
  operate: async ({ m, text, downloadXMp3, reply }) => {
    try {
      if (!text) return reply('*Please provide a valid YouTube link!*');
      const url = text.trim(); // Use the provided text directly as the URL
      console.log('YouTube URL:', url);
      await downloadXMp3(url);
    } catch (error) {
      console.error('ytmp3 command failed:', error);
      reply(`Error: ${error.message}`);
    }
  }
};