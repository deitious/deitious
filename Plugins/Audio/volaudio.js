// XPLOADER BOT by Tylor

const fs = require('fs');
const { exec } = require('child_process');
const { getRandom } = require('../../lib/myfunc'); // Correct import path

module.exports = {
  command: ['volaudio'],
  operate: async ({ Xploader, m, reply, args, quoted, mime, prefix, command }) => {
    if (!args.join(" ")) return reply(`*Example: ${prefix + command} 10*`);
    
    const media = await Xploader.downloadAndSaveMediaMessage(quoted, "volume");
    const rname = getRandom(".mp3");
    
    exec(`ffmpeg -i ${media} -filter:a volume=${args[0]} ${rname}`, (err, stderr, stdout) => {
      fs.unlinkSync(media);
      if (err) return reply("*Error!*");

      const jadie = fs.readFileSync(rname);
      Xploader.sendMessage(
        m.chat,
        { audio: jadie, mimetype: "audio/mp4", ptt: true },
        { quoted: m }
      );
      fs.unlinkSync(rname);
    });
  }
};