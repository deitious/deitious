// XPLOADER BOT by Tylor

const performance = require('perf_hooks').performance;

module.exports = {
  command: ['ping', 'p'],
  operate: async ({ m, Xploader }) => {
    const startTime = performance.now();

    try {
      // Send initial "Pong!" message
      const sentMessage = await Xploader.sendMessage(m.chat, {
        text: "Pong!",
        contextInfo: { quotedMessage: m.message }
      });
      
      const endTime = performance.now();
      const latency = endTime - startTime;
      const finalStatus = `*XPLOADER: ${latency.toFixed(2)} ms*`;

      // Edit the original message with latency information
      await Xploader.sendMessage(m.chat, {
        text: finalStatus,
        edit: sentMessage.key, // Specify the message key to edit
        contextInfo: { quotedMessage: m.message }
      });

    } catch (error) {
      console.error('Error sending ping message:', error);
      await Xploader.sendMessage(m.chat, {
        text: 'An error occurred while trying to ping.',
        contextInfo: { quotedMessage: m.message }
      });
    }
  }
};