// XPLOADER-BOT

module.exports = {
    command: ['antibadword', 'antitoxic'],
    operate: async (context) => {
        const { m, db, from, isBotAdmins, isAdmins, isCreator, args, mess, command } = context;

        if (!m.isGroup) return m.reply(mess.group); // Ensure it's a group
        if (!isBotAdmins) return m.reply(mess.admin); // Ensure the bot is an admin
        if (!isAdmins && !isCreator) return m.reply(mess.notadmin); // Ensure the user is an admin or creator
        if (args.length < 2) return m.reply("*Usage: .antibadword <delete/kick> <on/off>*");

        const mode = args[0].toLowerCase(); // Either "delete" or "kick"
        const state = args[1].toLowerCase(); // Either "on" or "off"

        if (!["delete", "kick"].includes(mode)) {
            return m.reply("*Invalid mode! Use either 'delete' or 'kick'.*");
        }

        if (!["on", "off"].includes(state)) {
            return m.reply("*Invalid state! Use either 'on' or 'off'.*");
        }

        if (state === "on") {
            // Enable the selected mode and disable the other
            if (mode === "delete") {
                db.data.chats[from].badword = true;
                db.data.chats[from].badwordkick = false;
            } else if (mode === "kick") {
                db.data.chats[from].badwordkick = true;
                db.data.chats[from].badword = false;
            }
            m.reply(`*Successfully enabled antibadword ${mode} mode!*`);
        } else if (state === "off") {
            // Disable the selected mode
            if (mode === "delete") {
                db.data.chats[from].badword = false;
            } else if (mode === "kick") {
                db.data.chats[from].badwordkick = false;
            }
            m.reply(`*Successfully disabled antibadword ${mode} mode!*`);
        }
    },
};