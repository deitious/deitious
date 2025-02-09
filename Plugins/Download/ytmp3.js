
module.exports = {
  command: ['ytmp3'],
  operate: async ({ m, text, downloadXMp3, reply }) => {
    try {
      if (!text) return m.reply('*Please provide a valid YouTube link!*');
      const url = text.trim();
      console.log('YouTube URL:', url);
      await downloadXMp3(url);
    } catch (error) {
      console.error('ytmp3 command failed:', error);
      m.reply(`Error: ${error.message}`);
    }
  }
};