// XPLOADER-BOT by Tylor

const axios = require('axios'); 

module.exports = {
  command: ['define2'],
  operate: async ({ m, text, Xploader, reply, mess }) => {
    if (!text) return reply(`What do you want to define?`);
    
    try {
      const targetfine = await axios.get(`http://api.urbandictionary.com/v0/define?term=${text}`);
      if (!targetfine) return reply(mess.error);
      
      const replyText = `
*WORD:* ${text}
*DEFINITION:* ${targetfine.data.list[0].definition.replace(/\[/g, "").replace(/\]/g, "")}
*EXAMPLE:* ${targetfine.data.list[0].example.replace(/\[/g, "").replace(/\]/g, "")}`;
      
      Xploader.sendMessage(m.chat, { text: replyText }, { quoted: m });
    } catch (err) {
      console.error(err);
      return reply(`*${text}* isn't a valid text`);
    }
  }
};