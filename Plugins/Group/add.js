// XPLOADER-BOT

module.exports = {
    command: ['add'],
    operate: async (context) => {
        const { m, mess, text, isCreator, Xploader } = context;
        if (!m.isGroup) return m.reply(mess.group);
        if (!isCreator) return m.reply(mess.owner);
        
        let bws = m.quoted
            ? m.quoted.sender
            : text.replace(/[^0-9]/g, "") + "@s.whatsapp.net";
        await Xploader.groupParticipantsUpdate(m.chat, [bws], "add");
        m.reply(mess.done);
    }
};