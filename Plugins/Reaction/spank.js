const axios = require('axios');

module.exports = {
  command: ['spank'],
  operate: async ({ Cypher, m, reply }) => {
    try {
      const { data } = await axios.get('https://nekos.life/api/v2/img/spank');
      await Cypher.sendImageAsSticker(m.from, data.url, m, {
        packname: global.packname,
        author: global.author,
      });
    } catch (err) {
      console.error('Error fetching spank:', err);
      reply('Failed to fetch spank image. Please try again later.');
    }
  },
};