
module.exports = {
  command: ['xvideos', 'porn', 'xdl'],
  operate: async ({ m, text, isCreator, reply, mess, Cypher, fetchJson, quoted }) => {
  if (!isCreator) return reply(mess.owner);
	if (!text) return reply('*Please provide a porn video search query!*');
    let kutu = await fetchJson(`https://api-aswin-sparky.koyeb.app/api/search/xnxx?search=${text}`)
	let kyuu = await fetchJson(`https://api-aswin-sparky.koyeb.app/api/downloader/xnxx?url=${kutu.result.result[0].link}`)
await Cypher.sendMessage(m.chat, {
 video: {url: kyuu.data.files.high}, 
 caption: global.wm,
 contextInfo: {
        externalAdReply: {
          title: global.botname,
          body: `${kutu.result.result[0].title}`,
          sourceUrl: `${kutu.result.result[0].link}`,
          mediaType: 2,
          mediaUrl: `${kutu.result.result[0].link}`,
        }
      }
    }, { quoted: m });
    
	let kyut = await fetchJson(`https://api-aswin-sparky.koyeb.app/api/downloader/xnxx?url=${kutu.result.result[1].link}`)
await Cypher.sendMessage(m.chat, {
 video: {url: kyut.data.files.high}, 
 caption: global.wm,
 contextInfo: {
        externalAdReply: {
          title: global.botname,
          body: `${kutu.result.result[1].title}`,
          sourceUrl: `${kutu.result.result[1].link}`,
          mediaType: 2,
          mediaUrl: `${kutu.result.result[1].link}`,
        }
      }
    }, { quoted: m });
  }
};