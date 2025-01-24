// XPLOADER-BOT by Tylor

const fetch = require('node-fetch'); 

module.exports = {
  command: ['quran'],
  operate: async ({ m, text, Xploader, reply }) => {
    try {
      // Extract the surah number or name from the command text.
      let surahInput = text.split(" ")[0];
      if (!surahInput) {
        throw new Error(`*Please specify the surah number or name*`);
      }
      
      let surahListRes = await fetch("https://quran-endpoint.vercel.app/quran");
      let surahList = await surahListRes.json();
      let surahData = surahList.data.find(
        (surah) =>
          surah.number === Number(surahInput) ||
          surah.asma.ar.short.toLowerCase() === surahInput.toLowerCase() ||
          surah.asma.en.short.toLowerCase() === surahInput.toLowerCase()
      );
      
      if (!surahData) {
        throw new Error(`Couldn't find surah with number or name "${surahInput}"`);
      }
      
      let res = await fetch(`https://quran-endpoint.vercel.app/quran/${surahData.number}`);
      if (!res.ok) {
        let error = await res.json();
        throw new Error(`API request failed with status ${res.status} and message ${error.message}`);
      }

      let json = await res.json();
      let quranSurah = `
*Quran: The Holy Book*\n
*Surah ${json.data.number}: ${json.data.asma.ar.long} (${json.data.asma.en.long})*\n
Type: ${json.data.type.en}\n
Number of verses: ${json.data.ayahCount}\n
*Explanation:*\n
${json.data.tafsir.id}`;
      
      reply(quranSurah);

      if (json.data.recitation.full) {
        await Xploader.sendMessage(
          m.chat,
          {
            audio: { url: json.data.recitation.full },
            mimetype: "audio/mp4",
            ptt: true,
            fileName: `recitation.mp3`,
          },
          { quoted: m }
        );
      }
    } catch (error) {
      reply(`Error: ${error.message}`);
    }
  }
};