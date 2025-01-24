// XPLOADER BOT by Tylor

const fs = require('fs');
const { exec } = require('child_process');
const { getRandom } = require('../../lib/myfunc'); // Import from your custom library

module.exports = {
  command: ['blown'],
  operate: async ({ Xploader, m, reply, quoted, mime, prefix, command }) => {
    try {
      const set = "-af acrusher=.1:1:64:0:log";
      
      if (/audio/.test(mime)) {
        let media = await Xploader.downloadAndSaveMediaMessage(quoted);
        let ran = getRandom(".mp3");
        exec(`ffmpeg -i ${media} ${set} ${ran}`, (err, stderr, stdout) => {
          fs.unlinkSync(media);
          if (err) return reply(err);
          let buff = fs.readFileSync(ran);
          Xploader.sendMessage(
            m.chat,
            { audio: buff, mimetype: "audio/mpeg" },
            { quoted: m }
          );
          fs.unlinkSync(ran);
        });
      } else {
        reply(
          `Reply to the audio you want to change with a caption *${prefix + command}*`
        );
      }
    } catch (e) {
      reply(e.toString());
    }
  }
};