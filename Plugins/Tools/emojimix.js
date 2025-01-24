// XPLOADER-BOT by Tylor

module.exports = {
  command: ['emojimix', 'emix'],
  operate: async ({ m, text, prefix, command, Xploader, fetchJson, reply }) => {
    let [emoji1, emoji2] = text.split`+`;
    
    if (!emoji1)
      return reply(`*Example : ${prefix + command} 😅+🤔*`);
    
    if (!emoji2)
      return reply(`*Example : ${prefix + command} 😅+🤔*`);
    
    try {
      let anu = await fetchJson(
        `https://tenor.googleapis.com/v2/featured?key=AIzaSyAyimkuYQYF_FXVALexPuGQctUWRURdCYQ&contentfilter=high&media_filter=png_transparent&component=proactive&collection=emoji_kitchen_v5&q=${encodeURIComponent(
          emoji1
        )}_${encodeURIComponent(emoji2)}`
      );
      
      for (let res of anu.results) {
        await Xploader.sendImageAsSticker(
          m.chat,
          res.url,
          m,
          {
            packname: global.packname,
            author: global.author,
            categories: res.tags,
          }
        );
      }
    } catch (error) {
      console.error(error);
      reply('*An error occurred while fetching emoji mix.*');
    }
  }
};