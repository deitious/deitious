// XPLOADER BOT by Tylor

const fetch = require('node-fetch');

module.exports = {
  command: ['trivia'],
  operate: async ({ Xploader, m, reply }) => {
    try {
      let res = await fetch("https://opentdb.com/api.php?amount=1");
      let json = await res.json();

      let question = json.results[0].question;
      let answer = json.results[0].correct_answer;

      await Xploader.sendMessage(m.chat, { text: `Question: ${question}\n\nThink you know the answer? Sending the correct answer after 20 seconds` }, { quoted: m });
      
      setTimeout(async () => {
        await Xploader.sendMessage(m.chat, { text: `Answer: ${answer}` });
      }, 20000); // 20 seconds
    } catch (error) {
      console.error('Error fetching trivia question:', error);
      reply('An error occurred while fetching the trivia question.');
    }
  }
};