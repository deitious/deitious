// XPLOADER-BOT by Tylor

const axios = require('axios'); 

module.exports = {
  command: ['fact'],
  operate: async ({ m, reply }) => {
    try {
      const { data } = await axios.get(`https://nekos.life/api/v2/fact`);
      return reply(`*FACT:* ${data.fact}\n`);
    } catch (err) {
      console.error(err);
      return reply('*An error occurred while fetching the fact.*');
    }
  }
};