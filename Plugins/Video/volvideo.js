// XPLOADER BOT by Tylor

const fs = require('fs');
const { exec } = require('child_process');
const { getRandom } = require('../../lib/myfunc');

module.exports = {
  command: ['volvideo'],
  operate: async ({ Xploader, m, reply, args, quoted }) => {
    if (!args.join(" ")) return reply(`*Example: ${global.prefixz + command} 10*`);

    try {
      const media = await Xploader.downloadAndSaveMediaMessage(quoted, "volume");
      const rname = getRandom(".mp4");

      exec(`ffmpeg -i ${media} -filter:a volume=${args[0]} ${rname}`, (err, stderr, stdout) => {
        fs.unlinkSync(media);
        if (err) return reply("*Error!*");

        const jadie = fs.readFileSync(rname);
        Xploader.sendMessage(
          m.chat,
          { video: jadie, mimetype: "video/mp4" },
          { quoted: m }
        );
        fs.unlinkSync(rname);
      });
    } catch (error) {
      console.error('Error processing video:', error);
      reply('An error occurred while processing the video.');
    }
  }
};