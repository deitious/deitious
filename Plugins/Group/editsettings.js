// XPLOADER-BOT by Tylor

module.exports = {
    command: ['editsettings', 'editinfo'],
    operate: async (context) => {
        const { m, mess, args, isAdmins, isGroupOwner, isCreator, isBotAdmins, Xploader, prefix, command } = context;
        if (!m.isGroup) return m.reply(mess.group);
        if (!isAdmins && !isGroupOwner && !isCreator) return m.reply(mess.admin);
        if (!isBotAdmins) return m.reply(mess.admin);

        if (args[0] === "on") {
            await Xploader.groupSettingUpdate(m.chat, "unlocked").then(
                (res) => m.reply(`*Successful, members can edit group info*`)
            );
        } else if (args[0] === "off") {
            await Xploader.groupSettingUpdate(m.chat, "locked").then((res) =>
                m.reply(`*Successful, members cannot edit group info*`)
            );
        } else {
            m.reply(`Example ${prefix + command} on/off`);
        }
    }
};