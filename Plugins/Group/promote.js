
module.exports = {
    command: ['promote'],
    operate: async (context) => {
        const { m, mess, text, isAdmins, isGroupOwner, isCreator, isBotAdmins, quoted, Cypher } = context;
        if (!m.isGroup) return reply(mess.group);
        if (!isAdmins && !isGroupOwner && !isCreator) return reply(mess.admin);
        if (!isBotAdmins) return reply(mess.admin);
        
        let bwst = m.mentionedJid[0]
            ? m.mentionedJid[0]
            : m.quoted
            ? m.quoted.sender
            : text.replace(/[^0-9]/g, "") + "@s.whatsapp.net";
        await Cypher.groupParticipantsUpdate(
            m.chat,
            [bwst],
            "promote"
        );
        reply(mess.done);
    }
};