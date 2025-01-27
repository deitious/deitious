// XPLOADER BOT by Tylor

const fetch = require('node-fetch');

module.exports = {
  command: ['imagen'],
  operate: async ({ Xploader, m, reply, text, prefix, command }) => {
    if (!text) return reply(`*Please provide a query to generate an image. Example: ${prefix + command} Beautiful landscape*`);

    const api2Url = `https://bk9.fun/ai/magicstudio?prompt=${encodeURIComponent(text)}`;
    try {
      await Xploader.sendMessage(m.chat, { image: { url: api2Url } }, { quoted: m });
    } catch (error) {
      console.error('Error generating image:', error);
      reply("*An error occurred while generating the image.*");
    }
  }
};