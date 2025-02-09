
const { fetchJson } = require('../../lib/myfunc');

module.exports = {
  command: ['apk', 'apkdl'],
  operate: async ({ m, text, Cypher, botname, reply }) => {
    if (!text) return reply("*Which apk do you want to download?*");
    
    try {
      let kyuu = await fetchJson(`https://bk9.fun/search/apk?q=${text}`);
      let tylor = await fetchJson(`https://bk9.fun/download/apk?id=${kyuu.BK9[0].id}`);

      await Cypher.sendMessage(
        m.chat,
        {
          document: { url: tylor.BK9.dllink },
          fileName: tylor.BK9.name,
          mimetype: "application/vnd.android.package-archive",
          contextInfo: {
            externalAdReply: {
              title: botname,
              body: `${tylor.BK9.name}`,
              thumbnailUrl: `${tylor.BK9.icon}`,
              sourceUrl: `${tylor.BK9.dllink}`,
              mediaType: 2,
              showAdAttribution: true,
              renderLargerThumbnail: false
            }
          }
        },
        { quoted: m }
      );
    } catch (error) {
      reply(`*Error fetching APK details*\n${error.message}`);
    }
  }
};