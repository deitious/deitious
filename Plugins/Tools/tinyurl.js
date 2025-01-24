// XPLOADER-BOT by Tylor

const axios = require('axios'); // Import axios

module.exports = {
  command: ['tinyurl', 'shortlink'],
  operate: async ({ m, text, prefix, command, reply }) => {
    if (!text) return reply(`*Example: ${prefix + command} https://instagram.com/heyits_tylor*`);
    
    try {
      const response = await axios.get(`https://tinyurl.com/api-create.php?url=${text}`);
      reply(response.data);
    } catch (error) {
      console.error(error);
      reply('*An error occurred while shortening the URL.*');
    }
  }
};