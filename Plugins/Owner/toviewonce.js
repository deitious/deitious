
module.exports = {
  command: ['toviewonce', 'tovo', 'tovv'],
  operate: async ({ Cypher, m, reply, isCreator, mess, quoted, mime }) => {
    if (!isCreator) return reply(mess.owner);
    if (!quoted) return reply(`*Reply to an Image or Video*`);

    if (/image/.test(mime)) {
      const anuan = await Cypher.downloadAndSaveMediaMessage(quoted);
      Cypher.sendMessage(
        m.chat,
        {
          image: { url: anuan },
          caption: mess.done,
          fileLength: "999",
          viewOnce: true
        },
        { quoted: m }
      );
    } else if (/video/.test(mime)) {
      const anuanuan = await Cypher.downloadAndSaveMediaMessage(quoted);
      Cypher.sendMessage(
        m.chat,
        {
          video: { url: anuanuan },
          caption: mess.done,
          fileLength: "99999999",
          viewOnce: true
        },
        { quoted: m }
      );
    } else if (/audio/.test(mime)) {
      const bebasap = await Cypher.downloadAndSaveMediaMessage(quoted);
      Cypher.sendMessage(m.chat, {
        audio: { url: bebasap },
        mimetype: "audio/mpeg",
        ptt: true,
        viewOnce: true
      });
    }
  }
};