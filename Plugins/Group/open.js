
module.exports = {
    command: ['open'],
    operate: async (context) => {
        const { m, mess, isAdmins, isCreator, isBotAdmins, Cypher } = context;
        if (!m.isGroup) return reply(mess.group);
        if (!isAdmins && !isCreator) return reply(mess.notadmin);
        if (!isBotAdmins) return reply(mess.admin);

        Cypher.groupSettingUpdate(m.chat, "not_announcement");
        reply("Group opened by admin. Members can now send messages.");
    }
};