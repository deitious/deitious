
module.exports = {
    command: ['resetlink'],
    operate: async (context) => {
        const { m, isAdmins, isGroupOwner, isCreator, mess, Cypher, isBotAdmins } = context;
        if (!m.isGroup) return reply(mess.group);
        if (!isAdmins && !isGroupOwner && !isCreator) return reply(mess.admin);
        if (!isBotAdmins) return reply(mess.admin);

        await Cypher.groupRevokeInvite(m.chat).then((res) => {
          reply(mess.done);
        });
    }
};