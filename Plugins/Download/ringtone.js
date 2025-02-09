
const { ringtone } = require('../../lib/scraper'); 
module.exports = {
  command: ['ringtone'],
  operate: async ({ m, text, prefix, command, Cypher, reply }) => {
    if (!text) return reply(`*Example: ${prefix + command} black rover*`);
    
    try {
      let anutone2 = await ringtone.ringtone(text);
      let result = anutone2[Math.floor(Math.random() * anutone2.length)];
      
      await Cypher.sendMessage(
        m.chat,
        {
          audio: { url: result.audio },
          fileName: result.title + ".mp3",
          mimetype: "audio/mpeg",
        },
        { quoted: m }
      );
    } catch (error) {
      reply(`Error fetching ringtone: ${error.message}`);
    }
  }
};