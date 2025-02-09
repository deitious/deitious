
const fetch = require('node-fetch');

module.exports = {
  command: ['define'],
  operate: async ({ Cypher, m, reply, text }) => {
    if (!text) return reply("Enter a word");

    try {
      let response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${text}`);
      let json = await response.json();

      let definitions = json[0].meanings[0].definitions;
      let definitionList = "";

      for (let i = 0; i < definitions.length; i++) {
        definitionList += `Definition ${i + 1}: ${definitions[i].definition}\n\n`;
      }

      await Cypher.sendMessage(m.chat, { text: definitionList }, { quoted: m });
    } catch (error) {
      console.error('Error fetching definitions:', error);
      reply(`No definition found for *${text}*`);
    }
  }
};