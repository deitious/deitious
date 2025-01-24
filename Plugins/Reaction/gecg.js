const axios = require('axios');

module.exports = {
  command: ['gecg'],
  operate: async ({ Xploader, m, reply }) => {
    try {
      const { data } = await axios.get('https://nekos.life/api/v2/img/gecg');
      await Xploader.sendImageAsSticker(m.from, data.url, m, {
        packname: global.packname,
        author: global.author,
      });
    } catch (err) {
      console.error('Error fetching gecg:', err);
      reply('Failed to fetch gecg image. Please try again later.');
    }
  },
};