// XPLOADER-BOT by Tylor

module.exports = {
    command: ['delppgroup'],
    operate: async (context) => {
        const { m, mess, isAdmins, isCreator, isBotAdmins, Xploader, from } = context;
        if (!m.isGroup) return m.reply(mess.group);
        if (!isAdmins && !isCreator) return m.reply(mess.notadmin);
        if (!isBotAdmins) return m.reply(mess.admin);
        
        await Xploader.removeProfilePicture(from);
        m.reply("Group profile picture has been successfully removed.");
    }
};