
module.exports = {
    command: ['add'],
    operate: async (context) => {
        const { m, mess, text, isCreator, reply,Cypher } = context;
        if (!m.isGroup) return m.reply(mess.group);
        if (!isCreator) return m.reply(mess.owner);
        
        let bws = m.quoted
            ? m.quoted.sender
            : text.replace(/[^0-9]/g, "") + "@s.whatsapp.net";
        await Cypher.groupParticipantsUpdate(m.chat, [bws], "add");
        reply(mess.done);
    }
};