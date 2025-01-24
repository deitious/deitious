// XPLOADER-BOT by Tylor

module.exports = {
  command: ['request'],
  operate: async ({ m, mess, text, Xploader, isCreator, versions, prefix, command }) => {
    if (!isCreator) return m.reply(mess.owner);
    if (!text) return m.reply(`Example: ${prefix + command} I would like a new feature (specify) to be added.`);

    const requestMsg = `
*REQUEST*

*User*: @${m.sender.split("@")[0]}
*Request*: ${text}

*Version*: ${versions}
    `;

    const confirmationMsg = `
Hi ${m.pushName},

Your request has been forwarded to my developer.
Please wait for a reply.

*Details:*
${requestMsg}
    `;

    Xploader.sendMessage("254754783972@s.whatsapp.net", { text: requestMsg, mentions: [m.sender] }, { quoted: m });
    Xploader.sendMessage(m.chat, { text: confirmationMsg, mentions: [m.sender] }, { quoted: m });
  }
};