// XPLOADER-BOT by Tylor


module.exports = {
  command: ['totalmembers'],
  operate: async ({ Xploader, m, reply, mess, participants, isGroupAdmins, isCreator, sleep, groupMetadata }) => {
    if (!m.isGroup) return reply(mess.group);
    if (!(isGroupAdmins || isCreator)) return reply(mess.admin);

    await Xploader.sendMessage(
      m.chat,
      {
        text: `*GROUP*: ${groupMetadata.subject}\n*MEMBERS*: ${participants.length}`,
      },
      { quoted: m, ephemeralExpiration: 86400 }
    );
  }
};