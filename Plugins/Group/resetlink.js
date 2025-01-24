// XPLOADER-BOT

module.exports = {
    command: ['resetlink'],
    operate: async (context) => {
        const { m, isAdmins, isGroupOwner, isCreator, mess, Xploader, isBotAdmins } = context;
        if (!m.isGroup) return m.reply(mess.group);
        if (!isAdmins && !isGroupOwner && !isCreator) return m.reply(mess.admin);
        if (!isBotAdmins) return m.reply(mess.admin);

        await Xploader.groupRevokeInvite(m.chat).then((res) => {
          m.reply(mess.done);
        });
    }
};