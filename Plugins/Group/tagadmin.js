// XPLOADER-BOT 

module.exports = {
  command: ['tagadmin', 'listadmin', 'admin'],
  operate: async ({ Xploader, m, reply, mess, participants, groupMetadata }) => {
    if (!m.isGroup) return reply(mess.group);

    const groupAdmins = participants.filter((p) => p.admin);
    const listAdmin = groupAdmins
      .map((v, i) => `${i + 1}. @${v.id.split("@")[0]}`)
      .join("\n");
    const owner = groupMetadata.owner || groupAdmins.find((p) => p.admin === "superadmin")?.id || m.chat.split`-`[0] + "@s.whatsapp.net";
    let text = `*Group Admins Here:*\n${listAdmin}`.trim();

    Xploader.sendMessage(
      m.chat,
      { text: text, mentions: [...groupAdmins.map((v) => v.id), owner] },
      { quoted: m }
    );
  }
};