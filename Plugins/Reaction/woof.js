const axios = require('axios');

module.exports = {
  command: ['woof'],
  operate: async ({ Cypher, m, reply }) => {
    try {
      const { data } = await axios.get('https://nekos.life/api/v2/img/woof');
      await Cypher.sendImageAsSticker(m.from, data.url, m, {
        packname: global.packname,
        author: global.author,
      });
    } catch (err) {
      console.error('Error fetching woof:', err);
      reply('Failed to fetch woof image. Please try again later.');
    }
  },
};