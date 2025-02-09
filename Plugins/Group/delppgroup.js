
module.exports = {
    command: ['delppgroup'],
    operate: async (context) => {
        const { m, mess, isAdmins, isCreator, isBotAdmins, Cypher, reply, from } = context;
        if (!m.isGroup) return reply(mess.group);
        if (!isAdmins && !isCreator) return reply(mess.notadmin);
        if (!isBotAdmins) return reply(mess.admin);
        
        await Cypher.removeProfilePicture(from);
        reply("Group profile picture has been successfully removed.");
    }
};