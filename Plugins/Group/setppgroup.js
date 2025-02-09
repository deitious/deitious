
const { generateProfilePicture } = require('@whiskeysockets/baileys');
const fs = require('fs');

module.exports = {
  command: ['setppgroup'],
  operate: async ({ m, reply, mess, isAdmins, isCreator, isBotAdmins, Cypher, quoted, mime, prefix, command, args }) => {
    if (!m.isGroup) return reply(mess.group);
    if (!isAdmins && !isCreator) return reply(mess.notadmin);
    if (!isBotAdmins) return reply(mess.admin);
    if (!quoted) return reply(`*Send or reply to an image with the caption ${prefix + command}*`);
    if (!/image/.test(mime)) return reply(`*Send or reply to an image with the caption ${prefix + command}*`);
    if (/webp/.test(mime)) return reply(`*Send or reply to an image with the caption ${prefix + command}*`);

    const medis = await Cypher.downloadAndSaveMediaMessage(quoted, "ppbot.jpeg");
    if (args[0] === "full") {
      const { img } = await generateProfilePicture(medis);
      await Cypher.query({
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
      await Cypher.updateProfilePicture(m.chat, { url: medis });
      fs.unlinkSync(medis);
      reply("Group profile picture has been successfully updated.");
    }
  }
};