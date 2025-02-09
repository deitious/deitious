
module.exports = {
    command: ['mediatag'],
    operate: async (context) => {
        const { m, isAdmins, mess, participants, Cypher, isBotAdmins } = context;
        if (!m.isGroup) return reply(mess.group);
        if (!isBotAdmins) return reply(mess.admin);
        if (!isAdmins) return reply(mess.admin);
        if (!m.quoted) return reply(`Reply to any media with caption ${prefix + command}`);

        Cypher.sendMessage(m.chat, {
          forward: m.quoted.fakeObj,
          mentions: participants.map((a) => a.id),
        });
    }
};