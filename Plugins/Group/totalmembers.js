
module.exports = {
  command: ['totalmembers'],
  operate: async ({ Cypher, m, reply, mess, participants, isGroupAdmins, isCreator, sleep, groupMetadata }) => {
    if (!m.isGroup) return reply(mess.group);
    if (!(isGroupAdmins || isCreator)) return reply(mess.admin);

    await Cypher.sendMessage(
      m.chat,
      {
        text: `*GROUP*: ${groupMetadata.subject}\n*MEMBERS*: ${participants.length}`,
      },
      { quoted: m, ephemeralExpiration: 86400 }
    );
  }
};