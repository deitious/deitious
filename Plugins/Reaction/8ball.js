const axios = require('axios');

module.exports = {
  command: ['8ball'],
  operate: async ({ Xploader, m, reply }) => {
    try {
      const { data } = await axios.get('https://nekos.life/api/v2/img/8ball');
      await Xploader.sendImageAsSticker(m.from, data.url, m, {
        packname: global.packname,
        author: global.author,
      });
    } catch (err) {
      console.error('Error fetching 8ball:', err);
      reply('Failed to fetch 8ball image. Please try again later.');
    }
  },
};