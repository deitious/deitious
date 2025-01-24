// XPLOADER-BOT 

module.exports = {
    command: ['tagall'],
    operate: async (context) => {
        const { m, isAdmins, isGroupOwner, isCreator, mess, q, participants, Xploader, isBotAdmins } = context;
        if (!m.isGroup) return m.reply(mess.group);
        if (!isAdmins && !isGroupOwner && !isCreator) return m.reply(mess.admin);
        if (!isBotAdmins) return m.reply(mess.admin);

        let me = m.sender;
        let teks = `*TAGGED BY:*  @${
          me.split("@")[0]
        }\n\n*MESSAGE:* ${q ? q : "No message"}\n\n`;
        for (let mem of participants) {
          teks += `@${mem.id.split("@")[0]}\n`;
        }
        Xploader.sendMessage(
          m.chat,
          {
            text: teks,
            mentions: participants.map((a) => a.id),
          },
          {
            quoted: m,
          }
        );
    }
};