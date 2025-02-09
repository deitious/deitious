
const { remini } = require('../../lib/remini');

module.exports = {
  command: ['remini', 'enhance', 'hd'],
  operate: async ({ m, mime, prefix, command, Cypher, mess, reply }) => {
    const quoted = m || m.quoted || m.msg?.quoted;
    if (!quoted) return reply(`*Send or reply to an image*`);
    if (!/image/.test(quoted.mimetype)) return reply(`Send or reply to an image with captions ${prefix + command}`);

    try {

      let media = await quoted.download();
      if (!media) return reply('*Failed to download the media. Please try again.*');
      
      let proses = await remini(media, 'enhance');
      await Cypher.sendMessage(m.chat, { image: proses, caption: mess.success }, { quoted: m });
    } catch (error) {
      console.error(error);
      reply('*An error occurred while enhancing the image.*');
    }
  },
};