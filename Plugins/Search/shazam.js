// XPLOADER-BOT by Tylor

const fs = require('fs'); 

module.exports = {
  command: ['shazam', 'find', 'whatmusic'],
  operate: async ({ m, mime, acr, Xploader, reply }) => {
    if (!m.quoted) {
      return reply('*It seems you want to identify a music. Please provide a quoted audio or video message for identification.*');
    }
    
    if (/audio|video/.test(mime)) {
      try {
        let media = await m.quoted.download();
        const ext = mime.split('/')[1];
        const filePath = `./src/${m.sender}.${ext}`;
        
        fs.writeFileSync(filePath, media);
        
        const res = await acr.identify(fs.readFileSync(filePath));
        const { code, msg } = res.status;
        
        if (code !== 0) {
          throw msg;
        }
        
        const { title, artists, album, genres, release_date } = res.metadata.music[0];
        const txt = `
┏▣ ◊ 𝗫𝗣𝗟𝗢𝗔𝗗𝗘𝗥 𝗕𝗢𝗧 ◊
│• TITLE: ${title}
│• ARTIST: ${artists !== undefined ? artists.map(v => v.name).join(', ') : 'NOT FOUND'}
│• ALBUM: ${album.name || 'NOT FOUND'}
│• GENRE: ${genres !== undefined ? genres.map(v => v.name).join(', ') : 'NOT FOUND'}
│• RELEASE DATE: ${release_date || 'NOT FOUND'}
┗▣ `.trim();
        
        fs.unlinkSync(filePath);
        reply(txt);
      } catch (error) {
        console.error(error);
        reply('*An error occurred during music identification.*');
      }
    }
  }
};