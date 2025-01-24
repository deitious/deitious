// XPLOADER-BOT

module.exports = {
    command: ['setdesc'],
    operate: async (context) => {
        const { m, mess, text, isAdmins, isGroupOwner, isCreator, isBotAdmins, Xploader } = context;
        if (!m.isGroup) return m.reply(mess.group);
        if (!isAdmins && !isGroupOwner && !isCreator) return m.reply(mess.notadmin);
        if (!isBotAdmins) return m.reply(mess.admin);
        if (!text) return m.reply("*Please enter a text*");
        
        await Xploader.groupUpdateDescription(m.chat, text);
        m.reply(mess.done);
    }
};