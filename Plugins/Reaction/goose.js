const axios = require('axios');

module.exports = {
  command: ['goose'],
  operate: async ({ Xploader, m, reply }) => {
    try {
      const { data } = await axios.get('https://nekos.life/api/v2/img/goose');
      await Xploader.sendImageAsSticker(m.from, data.url, m, {
        packname: global.packname,
        author: global.author,
      });
    } catch (err) {
      console.error('Error fetching goose:', err);
      reply('Failed to fetch goose image. Please try again later.');
    }
  },
};