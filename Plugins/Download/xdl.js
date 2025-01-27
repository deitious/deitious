// XPLOADER BOT by Tylor

module.exports = {
  command: ['xvideos', 'porn', 'xdl'],
  operate: async ({ m, text, isCreator, reply, mess, Xploader, fetchJson, quoted }) => {
  if (!isCreator) return reply(mess.owner);
	if (!text) return reply('*Please provide a porn video search query!*');
    let kutu = await fetchJson(`https://api-aswin-sparky.koyeb.app/api/search/xvideos?search=${text}`)
	let kyuu = await fetchJson(`https://api-aswin-sparky.koyeb.app/api/downloader/xdl?url=${kutu.data[0].url}`)
await Xploader.sendMessage(m.chat, {
 video: {url: kyuu.data}, 
 caption: `©𝐗𝐩𝐥𝐨𝐚𝐝𝐞𝐫𝐁𝐨𝐭` ,
 contextInfo: {
        externalAdReply: {
          title: global.botname,
          body: `${kutu.data[0].title}`,
          sourceUrl: `${kutu.data[0].url}`,
          mediaType: 2,
          mediaUrl: `${kutu.data[0].url}`,
        }
      }
    }, { quoted: m });
    
	let kyut = await fetchJson(`https://api-aswin-sparky.koyeb.app/api/downloader/xdl?url=${kutu.data[1].url}`)
await Xploader.sendMessage(m.chat, {
 video: {url: kyut.data}, 
 caption: `©𝐗𝐩𝐥𝐨𝐚𝐝𝐞𝐫𝐁𝐨𝐭` ,
 contextInfo: {
        externalAdReply: {
          title: global.botname,
          body: `${kutu.data[1].title}`,
          sourceUrl: `${kutu.data[1].url}`,
          mediaType: 2,
          mediaUrl: `${kutu.data[0].url}`,
        }
      }
    }, { quoted: m });
  
	let ktut = await fetchJson(`*https://api-aswin-sparky.koyeb.app/api/downloader/xdl?url=${kutu.data[2].url}*`)
await Xploader.sendMessage(m.chat, {
 video: {url: ktut.data}, 
 caption: `©𝐗𝐩𝐥𝐨𝐚𝐝𝐞𝐫𝐁𝐨𝐭` ,
 contextInfo: {
        externalAdReply: {
          title: botname,
          body: `${kutu.data[2].title}`,
          sourceUrl: `${kutu.data[2].url}`,
          mediaType: 2,
          mediaUrl: `${kutu.data[2].url}`,
        }
      }
    }, { quoted: m });
    Xploader.sendMessage(m.chat, { react: { text: '✅', key: m.key }})
  }
};