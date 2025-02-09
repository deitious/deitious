
const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');
const axios = require('axios');

module.exports = {
  command: ['mediafire'],
  operate: async ({ Cypher, m, reply, text }) => {
    if (!text) return reply("*Please provide a MediaFire file URL*");

    try {
      let response = await fetch(`https://api.siputzx.my.id/api/d/mediafire?url=${encodeURIComponent(text)}`);
      let data = await response.json();

      if (response.status !== 200 || !data.status || !data.data) {
        return reply("*Please try again later or try another command!*");
      } else {
        const downloadUrl = data.data.downloadLink;
        const filePath = path.join(__dirname, `${data.data.fileName}.zip`);

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
            fileName: data.data.fileName,
            mimetype: 'application/zip'
          });

          fs.unlinkSync(filePath);
        });

        writer.on('error', (err) => {
          console.error('Error downloading the file:', err);
          reply("An error occurred while downloading the file.");
        });
      }
    } catch (error) {
      console.error('Error fetching MediaFire file details:', error);
      reply("An error occurred while fetching the MediaFire file details.");
    }
  }
};