// XPLOADER-BOT by Tylor

const axios = require('axios');

module.exports = {
  command: ['handhold'], // Command name
  operate: async ({ m, command, reply, Xploader }) => {
    try {
      const { data } = await axios.get(`https://api.waifu.pics/sfw/${command}`);
      await Xploader.sendImageAsSticker(
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