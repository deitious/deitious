// XPLOADER BOT by Tylor

const fetch = require('node-fetch');

module.exports = {
  command: ['gpt'],
  operate: async ({ Xploader, m, reply, text }) => {
    if (!text) return reply("*Please ask a question*");

    try {
      let response = await fetch(`https://restapi.apibotwa.biz.id/api/gpt4o?message=${encodeURIComponent(text)}`);
      let data = await response.json();

      if (response.status !== 200 || !data.data || !data.data.response) {
        return reply("*Please try again later or try another command!*");
      } else {
        reply(data.data.response);
      }
    } catch (error) {
      console.error('Error fetching response from GPT API:', error);
      reply("An error occurred while fetching the response from GPT API.");
    }
  }
};