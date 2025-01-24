// XPLOADER-BOT 

module.exports = {
  command: ['unblock'],
  operate: async ({ Xploader, m, reply, isCreator, mess, text }) => {
    if (!isCreator) return reply(mess.owner);
    if (!m.quoted && !m.mentionedJid[0] && !text) return reply("Reply to a message or mention/user ID to unblock");

    const userId = m.mentionedJid[0] || m.quoted?.sender || text.replace(/[^0-9]/g, "") + "@s.whatsapp.net";
    await Xploader.updateBlockStatus(userId, "unblock");
    reply(mess.done);
  }
};