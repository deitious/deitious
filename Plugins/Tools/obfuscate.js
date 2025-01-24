// XPLOADER-BOT by Tylor

module.exports = {
  command: ['obfuscate'],
  operate: async ({ m, text, prefix, command, obfus, reply }) => {
    if (!text) return reply(`*Example: ${prefix + command} const bot = require("xploader");*`);
    
    try {
      let meg = await obfus(text);
      reply(`${meg.result}`);
    } catch (error) {
      console.error(error);
      reply('*An error occurred while obfuscating the text.*');
    }
  }
};