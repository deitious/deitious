const axios = require('axios');

module.exports = {
  command: ['lizard'],
  operate: async ({ Xploader, m, reply }) => {
    try {
      const { data } = await axios.get('https://nekos.life/api/v2/img/lizard');
      await Xploader.sendImageAsSticker(m.from, data.url, m, {
        packname: global.packname,
        author: global.author,
      });
    } catch (err) {
      console.error('Error fetching lizard:', err);
      reply('Failed to fetch lizard image. Please try again later.');
    }
  },
};