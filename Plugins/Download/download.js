
const fetch = require('node-fetch'); 

module.exports = {
  command: ['download'],
  operate: async ({ m, text, Cypher, reply }) => {
    if (!text) return reply('Enter download URL');
    
    try {
      let res = await fetch(text, { method: 'GET', redirect: 'follow' });
      let contentType = res.headers.get('content-type');
      let buffer = await res.buffer();
      let extension = contentType.split('/')[1]; 
      let filename = res.headers.get('content-disposition')?.match(/filename="(.*)"/)?.[1] || `download-${Math.random().toString(36).slice(2, 10)}.${extension}`;

      let mimeType;
      switch (contentType) {
        case 'audio/mpeg':
          mimeType = 'audio/mpeg';
          break;
        case 'image/png':
          mimeType = 'image/png';
          break;
        case 'image/jpeg':
          mimeType = 'image/jpeg';
          break;
        case 'application/pdf':
          mimeType = 'application/pdf';
          break;
        case 'application/zip':
          mimeType = 'application/zip';
          break;
        case 'video/mp4':
          mimeType = 'video/mp4';
          break;
        case 'video/webm':
          mimeType = 'video/webm';
          break;
        case 'application/vnd.android.package-archive':
          mimeType = 'application/vnd.android.package-archive';
          break;
        default:
          mimeType = 'application/octet-stream';
      }

      Cypher.sendMessage(m.chat, { document: buffer, mimetype: mimeType, fileName: filename }, { quoted: m });
    } catch (error) {
      reply(`Error downloading file: ${error.message}`);
    }
  }
};