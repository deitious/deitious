
module.exports = {
    command: ['close'],
    operate: async (context) => {
        const { m, mess, isAdmins, isCreator, isBotAdmins, Cypher, reply } = context;
        if (!m.isGroup) return reply(mess.group);
        if (!isAdmins && !isCreator) return reply(mess.notadmin);
        if (!isBotAdmins) return reply(mess.admin);

        Cypher.groupSettingUpdate(m.chat, "announcement");
        reply("Group closed by admin. Only admins can send messages.");
    }
};