// XPLOADER-BOT 

module.exports = {
    command: ['antibot'],
    operate: async (context) => {
        const { m, db, from, isBotAdmins, isAdmins, isCreator, args, mess, command } = context;
        if (!m.isGroup) return m.reply(mess.group);
        if (!isBotAdmins) return m.reply(mess.admin);
        if (!isAdmins && !isCreator) return m.reply(mess.notadmin);
        if (args.length < 1) return m.reply("*on or off?*");
        if (args[0] === "on") {
            db.data.chats[from].antibot = true;
            m.reply(`*Successfully enabled ${command}*`);
        } else if (args[0] === "off") {
            db.data.chats[from].antibot = false;
            m.reply(`*Successfully disabled ${command}*`);
        }
    }
};