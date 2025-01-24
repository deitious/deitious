// XPLOADER BOT by Tylor

const fs = require('fs');
const { exec } = require('child_process');
const { getRandom } = require('../../lib/myfunc');
const path = require('path');

module.exports = {
  command: ['toimage', 'toimg'],
  operate: async ({ Xploader, m, reply, args, prefix, command }) => {
    // Custom quoted handling
    const quoted = m.quoted || m.msg?.quoted;
    const mime = quoted?.mimetype || quoted?.msg?.mimetype;

    // Ensure the quoted message is a sticker
    if (!quoted || !/webp/.test(mime)) {
      return reply(`*Send or reply to a sticker with the caption ${prefix + command}*`);
    }

    try {
      // Download the sticker as raw data
      const media = await quoted.download();

      // Create a temporary file for the sticker
      const inputPath = path.join(__dirname, getRandom('.webp'));
      fs.writeFileSync(inputPath, media);

      // Create a temporary file for the output image
      const outputPath = path.join(__dirname, getRandom('.png'));

      // Convert the sticker to an image using ffmpeg
      exec(`ffmpeg -i ${inputPath} ${outputPath}`, (err) => {
        fs.unlinkSync(inputPath); // Delete the input sticker file

        if (err) {
          console.error('Error converting to image:', err);
          return reply('An error occurred while converting the sticker to an image.');
        }

        // Read and send the converted image
        const buffer = fs.readFileSync(outputPath);
        Xploader.sendMessage(m.chat, { image: buffer }, { quoted: m });

        // Delete the converted image file
        fs.unlinkSync(outputPath);
      });
    } catch (error) {
      console.error('Error converting to image:', error);
      reply('An error occurred while converting the sticker to an image.');
    }
  },
};