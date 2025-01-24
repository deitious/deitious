// XPLOADER-BOT by Tylor

const axios = require('axios'); 

module.exports = {
  command: ['quotes'],
  operate: async ({ m, reply }) => {
    try {
      const { data } = await axios.get(`https://favqs.com/api/qotd`);
      const textquotes = `*QUOTE:* ${data.quote.body}\n\n*AUTHOR:* ${data.quote.author}`;
      return reply(textquotes);
    } catch (err) {
      console.error(err);
      return reply('*An error occurred while fetching the quote.*');
    }
  }
};