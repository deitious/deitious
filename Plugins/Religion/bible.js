// XPLOADER-BOT by Tylor

const fetch = require('node-fetch'); 

module.exports = {
  command: ['bible'],
  operate: async ({ m, text, prefix, command, reply }) => {
    const BASE_URL = "https://bible-api.com";

    try {
      // Extract the chapter number or name from the command text.
      let chapterInput = text.split(" ").join("").trim();
      if (!chapterInput) {
        throw new Error(`*Please specify the chapter number or name. Example: ${prefix + command} John 3:16*`);
      }
      
      // Encode the chapterInput to handle special characters
      chapterInput = encodeURIComponent(chapterInput);
      
      // Make an API request to fetch the chapter information.
      let chapterRes = await fetch(`${BASE_URL}/${chapterInput}`);
      if (!chapterRes.ok) {
        throw new Error(`*Please specify the chapter number or name. Example: ${prefix + command} John 3:16*`);
      }
      
      let chapterData = await chapterRes.json();
      let bibleChapter = `
*The Holy Bible*\n
*Chapter ${chapterData.reference}*\n
Type: ${chapterData.translation_name}\n
Number of verses: ${chapterData.verses.length}\n
*Chapter Content:*\n
${chapterData.text}\n`;
      
      reply(bibleChapter);
    } catch (error) {
      reply(`Error: ${error.message}`);
    }
  }
};