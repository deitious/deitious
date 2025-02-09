
module.exports = {
  command: ['link', 'linkgc', 'gclink', 'grouplink'],
  operate: async ({ Cypher, m, reply, isAdmins, isGroupOwner, isCreator, mess, isBotAdmins, groupMetadata }) => {
    if (!m.isGroup) return reply(mess.group);
    if (!isAdmins && !isGroupOwner && !isCreator) return reply(mess.admin);
    if (!isBotAdmins) return reply(mess.admin);

    let response = await Cypher.groupInviteCode(m.chat);
    Cypher.sendText(
      m.chat,
      `*GROUP LINK*\n\n*NAME:* ${groupMetadata.subject}\n\n*OWNER:* ${groupMetadata.owner !== undefined ? "+" + groupMetadata.owner.split`@`[0] : "Unknown"}\n\n*ID:* ${groupMetadata.id}\n\n*LINK:* https://chat.whatsapp.com/${response}\n\n*MEMBERS:* ${groupMetadata.participants.length}`,
      m,
      {
        detectLink: true,
      }
    );
  }
};