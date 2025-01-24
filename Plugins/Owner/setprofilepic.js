// XPLOADER-BOT 

const { generateProfilePicture } = require('@whiskeysockets/baileys'); // Import generateProfilePicture
const fs = require('fs'); // Import fs

module.exports = {
  command: ['setprofilepic'],
  operate: async ({ Xploader, m, reply, isCreator, mess, prefix, command, quoted, mime, args, botNumber }) => {
    if (!isCreator) return reply(mess.owner);
    if (!quoted) return reply(`*Send or reply to an image With captions ${prefix + command}*`);
    if (!/image/.test(mime)) return reply(`*Send or reply to an image With captions ${prefix + command}*`);
    if (/webp/.test(mime)) return reply(`*Send or reply to an image With captions ${prefix + command}*`);

    const medis = await Xploader.downloadAndSaveMediaMessage(quoted, "ppbot.jpeg");

    if (args[0] === "full") {
      const { img } = await generateProfilePicture(medis);
      await Xploader.query({
        tag: "iq",
        attrs: {
          to: botNumber,
          type: "set",
          xmlns: "w:profile:picture",
        },
        content: [
          {
            tag: "picture",
            attrs: {
              type: "image",
            },
            content: img,
          },
        ],
      });
      fs.unlinkSync(medis);
      reply(mess.done);
    } else {
      await Xploader.updateProfilePicture(botNumber, {
        url: medis,
      });
      fs.unlinkSync(medis);
      reply(mess.done);
    }
  }
};