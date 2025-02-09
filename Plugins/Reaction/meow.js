const axios = require('axios');

module.exports = {
  command: ['meow'],
  operate: async ({ Cypher, m, reply }) => {
    try {
      const { data } = await axios.get('https://nekos.life/api/v2/img/meow');
      await Cypher.sendImageAsSticker(m.from, data.url, m, {
        packname: global.packname,
        author: global.author,
      });
    } catch (err) {
      console.error('Error fetching meow:', err);
      reply('Failed to fetch meow image. Please try again later.');
    }
  },
};