
module.exports = {
    command: ['setgroupname', 'setgcname'],
    operate: async (context) => {
        const { m, mess, text, isAdmins, isGroupOwner, isCreator, isBotAdmins, Cypher } = context;
        if (!m.isGroup) return reply(mess.group);
        if (!isAdmins && !isGroupOwner && !isCreator) return reply(mess.admin);
        if (!isBotAdmins) return reply(mess.admin);
        if (!text) return reply("*Desired groupname?*");

        await Cypher.groupUpdateSubject(m.chat, text);
        reply(mess.done);
    }
};