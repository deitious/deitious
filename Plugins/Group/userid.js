
module.exports = {
    command: ['userid', 'userjid'],
    operate: async (context) => {
        const { m, mess, isCreator, Cypher } = context;
        if (!isCreator) return reply(mess.owner);
        if (!m.isGroup) return reply(mess.group);

        const groupMetadata = m.isGroup
            ? await Cypher.groupMetadata(m.chat).catch((e) => {})
            : "";
        const participants = m.isGroup
            ? await groupMetadata.participants
            : "";
        let textt = `Here is jid address of all users of\n *${groupMetadata.subject}*\n\n`;
        for (let mem of participants) {
            textt += `□ ${mem.id}\n`;
        }
        reply(textt);
    }
};