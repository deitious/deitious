// XPLOADER BOT by Tylor

const fetch = require('node-fetch');

module.exports = {
  command: ['getmail'],
  operate: async ({ Xploader, m, reply, text }) => {
    if (!text) return reply("Please provide the temporary email address to fetch messages.");

    try {
      // Fetch email content
      let response = await fetch(`https://api.tioo.eu.org/getmail?email=${encodeURIComponent(text)}`);
      let data = await response.json();

      if (!data.status || !data.result || !Array.isArray(data.result.contentmail)) {
        return reply("Failed to fetch email content. Please try again.");
      }

      let emailContent = data.result.contentmail;

      if (emailContent.length === 0) {
        return reply(`*Temporary Email*: ${text}\n\nNo messages received yet. Check back later.`);
      }

      // Send email content
      let emailMessages = emailContent.map((email, index) => `*Email #${index + 1}:*\n${email}`).join('\n\n');
      await Xploader.sendMessage(m.chat, {
        text: `*Temporary Email*: ${text}\n\n*Messages Received*:\n${emailMessages}`
      }, { quoted: m });

    } catch (error) {
      console.error('Error fetching email content:', error);
      reply("An error occurred while fetching email content.");
    }
  }
};