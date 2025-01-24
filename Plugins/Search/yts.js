// XPLOADER BOT by Tylor

const yts = require('yt-search'); // Import yt-search

module.exports = {
  command: ['yts', 'ytsearch'],
  operate: async ({ Xploader, m, reply, text, prefix, command }) => {
    if (!text) return reply(`*Example : ${prefix + command} Eminem Godzilla*`);

    try {
      let search = await yts(text);
      let teks = `YouTube Search\n\n Result From "${text}"\n\n`;
      let no = 1;
      for (let i of search.all) {
        teks += `□ No : ${no++}\n□ Type : ${i.type}\n□ Video ID : ${i.videoId}\n□ Title : ${i.title}\n□ Views : ${i.views}\n□ Duration : ${i.timestamp}\n□ Uploaded : ${i.ago}\n□ Url : ${i.url}\n\n─────────────────\n\n`;
      }
      await Xploader.sendMessage(m.chat, { image: { url: search.all[0].thumbnail }, caption: teks }, { quoted: m });
    } catch (error) {
      console.error('YT Search command failed:', error);
      reply(`Error: ${error.message}`);
    }
  }
};