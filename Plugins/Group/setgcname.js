// XPLOADER-BOT 

module.exports = {
    command: ['setgroupname', 'setgcname'],
    operate: async (context) => {
        const { m, mess, text, isAdmins, isGroupOwner, isCreator, isBotAdmins, Xploader } = context;
        if (!m.isGroup) return m.reply(mess.group);
        if (!isAdmins && !isGroupOwner && !isCreator) return m.reply(mess.admin);
        if (!isBotAdmins) return m.reply(mess.admin);
        if (!text) return m.reply("*Desired groupname?*");

        await Xploader.groupUpdateSubject(m.chat, text);
        m.reply(mess.done);
    }
};