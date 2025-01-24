// XPLOADER BOT by Tylor

const fetch = require('node-fetch');

module.exports = {
  command: ['tempmail'],
  operate: async ({ Xploader, m, reply, prefix }) => {
    try {
      let response = await fetch('https://api.tioo.eu.org/tempmail');
      let data = await response.json();

      if (!data.status || !data.data || !data.data[0].email) {
        return reply("Failed to fetch a temporary email. Please try again.");
      }

      let tempEmail = data.data[0].email;

      // Send the temporary email address
      await Xploader.sendMessage(m.chat, {
        text: `*Temporary Email*: ${tempEmail}\n\nUse this email to receive temporary messages.\nTo read messages use ${prefix}getmail ${tempEmail}`
      }, { quoted: m });

    } catch (error) {
      console.error('Error fetching temporary email:', error);
      reply("An error occurred while fetching temporary email.");
    }
  }
};