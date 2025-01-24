// XPLOADER-BOT

module.exports = {
    command: ['invite'],
    operate: async (context) => {
        const { m, mess, text, prefix, Xploader, isBotAdmins } = context;
        if (!m.isGroup) return m.reply(mess.group);
        if (!isBotAdmins) return m.reply(mess.admin);
        if (!text)
            return m.reply(
                `*Enter the number you want to invite to this group*\n\nExample :\n${prefix + command} 254796180105`
            );
        if (text.includes("+"))
            return m.reply(`*Enter the number together without* *+*`);
        if (isNaN(text))
            return m.reply(
                `*Enter only the numbers with your country code without spaces*`
            );

        let group = m.chat;
        let link = "https://chat.whatsapp.com/" + (await Xploader.groupInviteCode(group));
        await Xploader.sendMessage(text + "@s.whatsapp.net", {
            text: `*GROUP INVITATION*\n\nSomeone invites you to join this group: \n\n${link}`,
            mentions: [m.sender],
        });
        m.reply(`*Successfully sent invite link*`);
    }
};