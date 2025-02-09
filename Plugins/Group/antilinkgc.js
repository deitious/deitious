
module.exports = {
    command: ['antilinkgc'],
    operate: async (context) => {
        const { m, db, from, isBotAdmins, isAdmins, isCreator, args, mess, command, reply } = context;

        if (!m.isGroup) return reply(mess.group); 
        if (!isBotAdmins) return reply(mess.admin); 
        if (!isAdmins && !isCreator) return reply(mess.notadmin); 
        if (args.length < 2) return reply("*Usage: .antilinkgc <delete/kick> <on/off>*");

        const mode = args[0].toLowerCase();
        const state = args[1].toLowerCase();

        if (!["delete", "kick"].includes(mode)) {
            return reply("*Invalid mode! Use either 'delete' or 'kick'.*");
        }

        if (!["on", "off"].includes(state)) {
            return reply("*Invalid state! Use either 'on' or 'off'.*");
        }

        if (state === "on") {
            if (mode === "delete") {
                db.data.chats[from].antilinkgc = true;
                db.data.chats[from].antilinkgckick = false;
            } else if (mode === "kick") {
                db.data.chats[from].antilinkgckick = true;
                db.data.chats[from].antilinkgc = false;
            }
            reply(`*Successfully enabled antilinkgc ${mode} mode!*`);
        } else if (state === "off") {
            if (mode === "delete") {
                db.data.chats[from].antilinkgc = false;
            } else if (mode === "kick") {
                db.data.chats[from].antilinkgckick = false;
            }
            reply(`*Successfully disabled antilinkgc ${mode} mode!*`);
        }
    },
};