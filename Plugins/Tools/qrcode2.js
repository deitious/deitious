// XPLOADER-BOT by Tylor

const fs = require('fs'); 
const qrcode = require('qrcode'); 

module.exports = {
  command: ['qrcode2'],
  operate: async ({ m, text, Xploader, reply, getRandom }) => {
    if (!text) return reply("*Please include link or text!*");

    try {
      let qyuer = await qrcode.toDataURL(text, { scale: 35 });
      let data = Buffer.from(qyuer.replace("data:image/png;base64,", ""), "base64");
      let buff = getRandom(".jpg");

      await fs.writeFileSync("./" + buff, data);
      let medi = fs.readFileSync("./" + buff);

      await Xploader.sendMessage(
        m.chat,
        { image: medi, caption: "©𝐗𝐩𝐥𝐨𝐚𝐝𝐞𝐫𝐁𝐨𝐭" },
        { quoted: m }
      );

      setTimeout(() => {
        fs.unlinkSync("./" + buff);
      }, 10000);
    } catch (error) {
      console.error(error);
      reply('*An error occurred while generating the QR code.*');
    }
  }
};