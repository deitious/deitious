
const axios = require('axios');

module.exports = {
  command: ['blush'],
  operate: async ({ m, command, reply, Cypher }) => {
    try {
      const { data } = await axios.get(`https://api.waifu.pics/sfw/${command}`);
      await Cypher.sendImageAsSticker(
        m.chat,
        data.url,
        m,
        {
          packname: global.packname,
          author: global.author,
        }
      );
    } catch (error) {
      reply(`Error fetching sticker: ${error.message}`);
    }
  }
};