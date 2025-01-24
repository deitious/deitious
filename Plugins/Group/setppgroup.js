// XPLOADER-BOT by Tylor

const { generateProfilePicture } = require('@whiskeysockets/baileys'); // Import generateProfilePicture
const fs = require('fs'); // Import fs

module.exports = {
  command: ['setppgroup'],
  operate: async ({ m, reply, mess, isAdmins, isCreator, isBotAdmins, Xploader, quoted, mime, prefix, command, args }) => {
    if (!m.isGroup) return reply(mess.group);
    if (!isAdmins && !isCreator) return reply(mess.notadmin);
    if (!isBotAdmins) return reply(mess.admin);
    if (!quoted) return reply(`*Send or reply to an image with the caption ${prefix + command}*`);
    if (!/image/.test(mime)) return reply(`*Send or reply to an image with the caption ${prefix + command}*`);
    if (/webp/.test(mime)) return reply(`*Send or reply to an image with the caption ${prefix + command}*`);

    const medis = await Xploader.downloadAndSaveMediaMessage(quoted, "ppbot.jpeg");
    if (args[0] === "full") {
      const { img } = await generateProfilePicture(medis);
      await Xploader.query({
        tag: "iq",
        attrs: {
          to: m.chat,
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
      reply("Group profile picture has been successfully set.");
    } else {
      await Xploader.updateProfilePicture(m.chat, { url: medis });
      fs.unlinkSync(medis);
      reply("Group profile picture has been successfully updated.");
    }
  }
};