// XPLOADER BOT by Tylor

const fetch = require('node-fetch');

module.exports = {
  command: ['image', 'img'],
  operate: async ({ Xploader, m, reply, text }) => {
    if (!text) return reply("*Please provide a search query*");

    try {
      let response = await fetch(`https://api.siputzx.my.id/api/s/pinterest?query=${encodeURIComponent(text)}`);
      let data = await response.json();

      if (response.status !== 200 || !data.status || !data.data || data.data.length === 0) {
        return reply("*Please try again later or try another command!*");
      } else {
        // Send the first 5 images
        const images = data.data.slice(0, 5);

        for (const image of images) {
          await Xploader.sendMessage(m.chat, {
            image: { url: image.images_url },
          });
        }
      }
    } catch (error) {
      console.error('Error fetching images:', error);
      reply("An error occurred while fetching images.");
    }
  }
};