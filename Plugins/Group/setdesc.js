
module.exports = {
    command: ['setdesc'],
    operate: async (context) => {
        const { m, mess, text, isAdmins, isGroupOwner, isCreator, isBotAdmins, Cypher } = context;
        if (!m.isGroup) return reply(mess.group);
        if (!isAdmins && !isGroupOwner && !isCreator) return reply(mess.notadmin);
        if (!isBotAdmins) return reply(mess.admin);
        if (!text) return reply("*Please enter a text*");
        
        await Cypher.groupUpdateDescription(m.chat, text);
        reply(mess.done);
    }
};