// XPLOADER BOT by Tylor

const { y2save } = require('../../lib/y2save.js'); 
const yts = require('yt-search');
const { fetchJson } = require('../../lib/myfunc'); 

module.exports = {
  command: ['playdoc', 'songdoc'],
  operate: async ({ Xploader, m, reply, text, botname }) => {
    if (!text) return reply('*Please provide a song name!*');

    const query = text;

    try {
      // Main method using Vreden API
      const response = await fetchJson(`https://api.vreden.web.id/api/ytplaymp3?query=${encodeURIComponent(query)}`);
      if (response.status !== 200 || !response.result || !response.result.download || !response.result.download.status) {
        throw new Error('*Failed to retrieve the song!*');
      }

      const data = response.result;
      const audioBuffer = await fetch(data.download.url).then(res => res.buffer());

      await Xploader.sendMessage(m.chat, {
        document: audioBuffer,
        mimetype: 'audio/mp3',
        fileName: `${data.metadata.title}.mp3`,
        contextInfo: {
          externalAdReply: {
            title: botname,
            body: `${data.metadata.title}`,
            thumbnailUrl: `${data.metadata.thumbnail}`,
            sourceUrl: `${data.metadata.url}`,
            mediaType: 2,
            mediaUrl: `${data.metadata.thumbnail}`
          }
        }
      }, { quoted: m });
      Xploader.sendMessage(m.chat, { react: { text: '✅', key: m.key } });

    } catch (error) {
      console.error('Vreden API failed:', error);

      // Fallback method using y2save
      try {
        const search = await yts(query);
        if (!search.all[0]) return reply('*Song not found!*');
        const url = search.all[0].url;
        const data = await y2save.main(url, 'mp3', '128kbps');

        if (!data) throw new Error('*Failed to retrieve the song!*');

        const audioBuffer = await fetch(data).then(res => res.buffer());

        await Xploader.sendMessage(m.chat, {
          document: audioBuffer,
          mimetype: 'audio/mp3',
          fileName: `${search.all[0].title}.mp3`,
          contextInfo: {
            externalAdReply: {
              title: botname,
              body: `${search.all[0].title}`,
              thumbnailUrl: `${search.all[0].thumbnail}`,
              sourceUrl: `${url}`,
              mediaType: 2,
              mediaUrl: `${search.all[0].thumbnail}`
            }
          }
        }, { quoted: m });
        Xploader.sendMessage(m.chat, { react: { text: '✅', key: m.key } });

      } catch (fallbackError) {
        console.error('y2save method failed:', fallbackError);
        reply(`Error: ${fallbackError.message}`);
      }
    }
  }
};