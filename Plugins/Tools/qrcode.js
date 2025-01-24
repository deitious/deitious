// XPLOADER BOT by Tylor

const fetch = require('node-fetch');

module.exports = {
  command: ['qrcode'],
  operate: async ({ Xploader, m, reply, text }) => {
    if (!text) return reply("Enter text or URL");

    try {
      let res = await fetch(`https://api.qrserver.com/v1/create-qr-code/?data=${text}&size=200x200`);
      let qrCodeUrl = res.url;

      await Xploader.sendMessage(m.chat, { image: { url: qrCodeUrl } }, { quoted: m });
    } catch (error) {
      console.error('Error generating QR code:', error);
      reply('An error occurred while generating the QR code.');
    }
  }
};