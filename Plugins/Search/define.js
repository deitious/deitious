// XPLOADER BOT by Tylor

const fetch = require('node-fetch');

module.exports = {
  command: ['define'],
  operate: async ({ Xploader, m, reply, text }) => {
    if (!text) return reply("Enter a word");

    try {
      let response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${text}`);
      let json = await response.json();

      let definitions = json[0].meanings[0].definitions;
      let definitionList = "";

      for (let i = 0; i < definitions.length; i++) {
        definitionList += `Definition ${i + 1}: ${definitions[i].definition}\n\n`;
      }

      await Xploader.sendMessage(m.chat, { text: definitionList }, { quoted: m });
    } catch (error) {
      console.error('Error fetching definitions:', error);
      reply("An error occurred while fetching the definitions.");
    }
  }
};