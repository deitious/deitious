const axios = require('axios');

module.exports = {
  command: ['tickle'],
  operate: async ({ Cypher, m, reply }) => {
    try {
      const { data } = await axios.get('https://nekos.life/api/v2/img/tickle');
      await Cypher.sendImageAsSticker(m.from, data.url, m, {
        packname: global.packname,
        author: global.author,
      });
    } catch (err) {
      console.error('Error fetching tickle:', err);
      reply('Failed to fetch tickle image. Please try again later.');
    }
  },
};