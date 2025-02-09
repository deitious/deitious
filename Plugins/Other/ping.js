
const performance = require('perf_hooks').performance;

module.exports = {
  command: ['ping', 'p'],
  operate: async ({ m, Cypher }) => {
    const startTime = performance.now();

    try {
      const sentMessage = await Cypher.sendMessage(m.chat, {
        text: "Pong!",
        contextInfo: { quotedMessage: m.message }
      });
      
      const endTime = performance.now();
      const latency = endTime - startTime;
      const finalStatus = `*CypherX: ${latency.toFixed(2)} ms*`;
      await Cypher.sendMessage(m.chat, {
        text: finalStatus,
        edit: sentMessage.key, 
        contextInfo: { quotedMessage: m.message }
      });

    } catch (error) {
      console.error('Error sending ping message:', error);
      await Cypher.sendMessage(m.chat, {
        text: 'An error occurred while trying to ping.',
        contextInfo: { quotedMessage: m.message }
      });
    }
  }
};