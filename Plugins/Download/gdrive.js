
const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');
const axios = require('axios');

module.exports = {
  command: ['gdrive'],
  operate: async ({ Cypher, m, reply, text }) => {
    if (!text) return reply("*Please provide a Google Drive file URL*");

    try {
      let response = await fetch(`https://api.siputzx.my.id/api/d/gdrive?url=${encodeURIComponent(text)}`);
      let data = await response.json();

      if (response.status !== 200 || !data.status || !data.data) {
        return reply("*Please try again later or try another command!*");
      } else {
        const downloadUrl = data.data.download;
        const filePath = path.join(__dirname, `${data.data.name}`);

        const writer = fs.createWriteStream(filePath);
        const fileResponse = await axios({
          url: downloadUrl,
          method: 'GET',
          responseType: 'stream'
        });

        fileResponse.data.pipe(writer);

        writer.on('finish', async () => {
          await Cypher.sendMessage(m.chat, {
            document: { url: filePath },
            fileName: data.data.name,
            mimetype: fileResponse.headers['content-type']
          });

          fs.unlinkSync(filePath);
        });

        writer.on('error', (err) => {
          console.error('Error downloading the file:', err);
          reply("An error occurred while downloading the file.");
        });
      }
    } catch (error) {
      console.error('Error fetching Google Drive file details:', error);
      reply("An error occurred while fetching the Google Drive file details.");
    }
  }
};