const { addExif } = require('../../lib/exif'); 

module.exports = {
  command: ['take', 'wm', 'steal'],
  operate: async ({ Xploader, m, reply, args, pushname }) => {
    // Ensure the message is a reply to a sticker
    if (!m.quoted) return reply('Please reply to a sticker to add watermark or metadata.');

    try {
      // Extract pack name and author from arguments
      let stick = args.join(" ").split("|");
      let packName = stick[0] && stick[0].trim() !== "" ? stick[0] : pushname || global.packname;
      let authorName = stick[1] ? stick[1].trim() : "";

      // Validate MIME type of the quoted message
      let mime = m.quoted.mimetype || '';
      if (!/webp/.test(mime)) return reply('Please reply to a sticker.');

      // Download the sticker as a buffer
      let stickerBuffer = await m.quoted.download();
      if (!stickerBuffer) return reply('Failed to download the sticker. Please try again.');

      // Add Exif data to the sticker
      let stickerWithExif = await addExif(stickerBuffer, packName, authorName);

      // Send the sticker back with new metadata
      if (stickerWithExif) {
        await Xploader.sendFile(
          m.chat,
          stickerWithExif,
          'sticker.webp',
          '',
          m,
          null,
          { mentions: [m.sender] }
        );
      } else {
        throw new Error('Failed to process the sticker with metadata.');
      }
    } catch (error) {
      console.error('Error in watermark/sticker metadata plugin:', error);
      reply('An error occurred while processing the sticker.');
    }
  },
};