const { downloadContentFromMessage } = require('@whiskeysockets/baileys');

module.exports = {
  command: ['sticker2', 's2'],
  operate: async ({ Xploader, m, reply, args, prefix, command }) => {
    const quoted = m.quoted || m.msg?.quoted;
    if (!quoted) {
      return reply(`Send or reply to an image/video with ${prefix + command}`);
    }

    const mime = quoted.mimetype || quoted.msg?.mimetype;
    if (!mime) {
      return reply(`No media detected`);
    }

    console.log('MIME Type:', mime); // Debugging

    const swns = args.join(" ");
    const packname = swns.split("|")[0] || global.packname;
    const author = swns.split("|")[1] || global.author;

    try {
      let mediaBuffer;
      if (/image/.test(mime) || /video/.test(mime)) {
        console.log('Downloading media...');
        const stream = await downloadContentFromMessage(quoted.message[Object.keys(quoted.message)[0]], /image/.test(mime) ? 'image' : 'video');
        let buffer = Buffer.from([]);
        for await (const chunk of stream) {
          buffer = Buffer.concat([buffer, chunk]);
        }
        mediaBuffer = buffer;
        console.log('Downloaded Buffer Length:', mediaBuffer.length);
      }

      if (/image/.test(mime)) {
        await Xploader.sendImageAsSticker(m.chat, mediaBuffer, m, { packname, author });
      } else if (/video/.test(mime)) {
        if ((quoted.msg || quoted).seconds > 10) return reply("Video too long");
        await Xploader.sendVideoAsSticker(m.chat, mediaBuffer, m, { packname, author });
      } else {
        return reply(`Send or reply to an image/video with ${prefix + command}`);
      }
    } catch (error) {
      console.error('Sticker Plugin Error:', error);
      reply('An error occurred while processing the sticker.', error);
    }
  }
};
