const axios = require('axios');

module.exports = {
  command: ['avatar'],
  operate: async ({ Cypher, m, reply }) => {
    try {
      const { data } = await axios.get('https://nekos.life/api/v2/img/avatar');
      await Cypher.sendImageAsSticker(m.from, data.url, m, {
        packname: global.packname,
        author: global.author,
      });
    } catch (err) {
      console.error('Error fetching avatar:', err);
      reply('Failed to fetch avatar image. Please try again later.');
    }
  },
};