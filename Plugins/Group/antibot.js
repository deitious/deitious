
module.exports = {
    command: ['antibot'],
    operate: async (context) => {
        const { m, db, from, isBotAdmins, isAdmins, isCreator, args, mess, command, reply } = context;
        if (!m.isGroup) return reply(mess.group);
        if (!isBotAdmins) return reply(mess.admin);
        if (!isAdmins && !isCreator) return reply(mess.notadmin);
        if (args.length < 1) return reply("*on or off?*");
        if (args[0] === "on") {
            db.data.chats[from].antibot = true;
            reply(`*Successfully enabled ${command}*`);
        } else if (args[0] === "off") {
            db.data.chats[from].antibot = false;
            reply(`*Successfully disabled ${command}*`);
        }
    }
};