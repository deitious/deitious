// XPLOADER-BOT by Tylor

module.exports = {
    command: ['open'],
    operate: async (context) => {
        const { m, mess, isAdmins, isCreator, isBotAdmins, Xploader } = context;
        if (!m.isGroup) return m.reply(mess.group);
        if (!isAdmins && !isCreator) return m.reply(mess.notadmin);
        if (!isBotAdmins) return m.reply(mess.admin);

        Xploader.groupSettingUpdate(m.chat, "not_announcement");
        m.reply("Group opened by admin. Members can now send messages.");
    }
};