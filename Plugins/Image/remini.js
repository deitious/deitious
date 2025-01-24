// XPLOADER-BOT by Tylor
const { remini } = require('../../lib/remini');

module.exports = {
  command: ['remini', 'enhance', 'hd'],
  operate: async ({ m, mime, prefix, command, Xploader, mess, reply }) => {
    // Handle custom quoted logic
    const quoted = m.quoted || m.msg?.quoted;
    if (!quoted) return reply(`*Send or reply to an image*`);
    if (!/image/.test(quoted.mimetype)) return reply(`Send or reply to an image with captions ${prefix + command}`);

    try {
      // Download the image from the quoted message
      let media = await quoted.download();
      if (!media) return reply('*Failed to download the media. Please try again.*');

      // Process the image using remini
      let proses = await remini(media, 'enhance');
      await Xploader.sendMessage(m.chat, { image: proses, caption: mess.success }, { quoted: m });
    } catch (error) {
      console.error(error);
      reply('*An error occurred while enhancing the image.*');
    }
  },
};