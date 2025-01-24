// XPLOADER-BOT 

module.exports = {
    command: ['promote'],
    operate: async (context) => {
        const { m, mess, text, isAdmins, isGroupOwner, isCreator, isBotAdmins, quoted, Xploader } = context;
        if (!m.isGroup) return m.reply(mess.group);
        if (!isAdmins && !isGroupOwner && !isCreator) return m.reply(mess.admin);
        if (!isBotAdmins) return m.reply(mess.admin);
        
        let bwst = m.mentionedJid[0]
            ? m.mentionedJid[0]
            : m.quoted
            ? m.quoted.sender
            : text.replace(/[^0-9]/g, "") + "@s.whatsapp.net";
        await Xploader.groupParticipantsUpdate(
            m.chat,
            [bwst],
            "promote"
        );
        m.reply(mess.done);
    }
};