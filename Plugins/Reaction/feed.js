const axios = require('axios');

module.exports = {
  command: ['feed'],
  operate: async ({ Xploader, m, reply }) => {
    try {
      const { data } = await axios.get('https://nekos.life/api/v2/img/feed');
      await Xploader.sendImageAsSticker(m.from, data.url, m, {
        packname: global.packname,
        author: global.author,
      });
    } catch (err) {
      console.error('Error fetching feed:', err);
      reply('Failed to fetch feed image. Please try again later.');
    }
  },
};