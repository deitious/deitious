
module.exports = {
  command: ['ytmp3doc'],
  operate: async ({ m, text, downloadXMp3Doc, reply }) => {
    try {
      if (!text) return m.reply('*Please provide a valid YouTube link!*');
      const url = text.trim(); 
      console.log('YouTube URL:', url);
      await downloadXMp3Doc(url);
    } catch (error) {
      console.error('ytmp3doc command failed:', error);
      m.reply(`Error: ${error.message}`);
    }
  }
};