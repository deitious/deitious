// XPLOADER BOT by Tylor

const axios = require('axios');

module.exports = {
  command: ['gpt'],
  operate: async ({ m, text }) => {
    async function fetchDeepSeek(query) {
      let { data } = await axios.post("https://api.blackbox.ai/api/chat", {
        messages: [{ id: null, role: "user", content: query }],
        userSelectedModel: "deepseek-v3"
      });
      return data;
    }

    try {
      if (!text) return m.reply('*Please ask a question*');
      const result = await fetchDeepSeek(text);
      m.reply(result);
    } catch (error) {
      console.error('Error in GPT plugin:', error);
      m.reply('An error occurred!');
    }
  }
};