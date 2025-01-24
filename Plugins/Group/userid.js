// XPLOADER-BOT by Tylor


module.exports = {
    command: ['userid', 'userjid'],
    operate: async (context) => {
        const { m, mess, isCreator, Xploader } = context;
        if (!isCreator) return m.reply(mess.owner);
        if (!m.isGroup) return m.reply(mess.group);

        const groupMetadata = m.isGroup
            ? await Xploader.groupMetadata(m.chat).catch((e) => {})
            : "";
        const participants = m.isGroup
            ? await groupMetadata.participants
            : "";
        let textt = `Here is jid address of all users of\n *${groupMetadata.subject}*\n\n`;
        for (let mem of participants) {
            textt += `□ ${mem.id}\n`;
        }
        m.reply(textt);
    }
};