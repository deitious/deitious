
module.exports = {
    command: ['hidetag', 'tag'], 
    operate: async (context) => {
        const { m, isAdmins, isGroupOwner, isCreator, mess, participants, Cypher, isBotAdmins } = context;
        if (!m.isGroup) return reply(mess.group);
        if (!isAdmins && !isGroupOwner && !isCreator) return reply(mess.admin);
        if (!isBotAdmins) return reply(mess.admin);
        const quotedText = m.quoted ? m.quoted.text : null;
        const providedText = m.text?.split(" ").slice(1).join(" ") || null;
        const textToSend = quotedText || providedText || "No message provided";
        await Cypher.sendMessage(
            m.chat,
            {
                text: textToSend,
                mentions: participants.map((a) => a.id),
            },
            {
                quoted: m,
            }
        );
    }
};