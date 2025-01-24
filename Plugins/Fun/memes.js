// XPLOADER BOT by Tylor

const fetch = require('node-fetch');

module.exports = {
  command: ['memes', 'meme'],
  operate: async ({ Xploader, m, reply }) => {
    try {
      let res = await fetch("https://api.imgflip.com/get_memes");
      let json = await res.json();

      for (let i = 0; i < 5; i++) {
        let meme = json.data.memes[i];
        await Xploader.sendMessage(m.chat, { image: { url: meme.url } }, { quoted: m });
      }
    } catch (error) {
      console.error('Error fetching memes:', error);
      reply('An error occurred while fetching memes.');
    }
  }
};