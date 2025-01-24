const axios = require('axios');

module.exports = {
  command: ['woof'],
  operate: async ({ Xploader, m, reply }) => {
    try {
      const { data } = await axios.get('https://nekos.life/api/v2/img/woof');
      await Xploader.sendImageAsSticker(m.from, data.url, m, {
        packname: global.packname,
        author: global.author,
      });
    } catch (err) {
      console.error('Error fetching woof:', err);
      reply('Failed to fetch woof image. Please try again later.');
    }
  },
};