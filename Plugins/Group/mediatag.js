// XPLOADER-BOT

module.exports = {
    command: ['mediatag'],
    operate: async (context) => {
        const { m, isAdmins, mess, participants, Xploader, isBotAdmins } = context;
        if (!m.isGroup) return m.reply(mess.group);
        if (!isBotAdmins) return m.reply(mess.admin);
        if (!isAdmins) return m.reply(mess.admin);
        if (!m.quoted) return m.reply(`Reply to any media with caption ${prefix + command}`);

        Xploader.sendMessage(m.chat, {
          forward: m.quoted.fakeObj,
          mentions: participants.map((a) => a.id),
        });
    }
};