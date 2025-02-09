
module.exports = {
    command: ['kick', 'remove'],
    operate: async (context) => {
        const { m, mess, text, isAdmins, isGroupOwner, isCreator, isBotAdmins, Cypher } = context;
        if (!m.isGroup) return reply(mess.group);
        if (!isAdmins && !isGroupOwner && !isCreator) return reply(mess.admin);
        if (!isBotAdmins) return reply(mess.admin);

        let bck = m.mentionedJid[0]
            ? m.mentionedJid[0]
            : m.quoted
            ? m.quoted.sender
            : text.replace(/[^0-9]/g, "") + "@s.whatsapp.net";
        await Cypher.groupParticipantsUpdate(m.chat, [bck], "remove");
        reply(mess.done);
    }
};