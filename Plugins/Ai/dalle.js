// XPLOADER BOT by Tylor

const fetch = require('node-fetch');

module.exports = {
  command: ['dalle'],
  operate: async ({ Xploader, m, reply, text }) => {
    if (!text) return reply("*Please enter a query!*");

    const apiUrl = `https://api.siputzx.my.id/api/ai/stable-diffusion?prompt=${encodeURIComponent(text)}`;
    try {
      await Xploader.sendMessage(m.chat, { image: { url: apiUrl } }, { quoted: m });
    } catch (error) {
      console.error('Error generating image:', error);
      reply("*An error occurred while generating the image.*");
    }
  }
};