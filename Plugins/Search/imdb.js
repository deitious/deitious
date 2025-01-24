// XPLOADER BOT by Tylor

const axios = require('axios');

module.exports = {
  command: ['imdb'],
  operate: async ({ Xploader, m, reply, text }) => {
    if (!text) return reply(`*Name a series or movie*`);
    
    try {
      let response = await axios.get(`http://www.omdbapi.com/?apikey=742b2d09&t=${text}&plot=full`);
      let movieData = response.data;

      let imdbText = `🎬 *IMDB SEARCH* 🎬\n\n`;
      imdbText += `*Title:* ${movieData.Title}\n`;
      imdbText += `*Year:* ${movieData.Year}\n`;
      imdbText += `*Rated:* ${movieData.Rated}\n`;
      imdbText += `*Released:* ${movieData.Released}\n`;
      imdbText += `*Runtime:* ${movieData.Runtime}\n`;
      imdbText += `*Genre:* ${movieData.Genre}\n`;
      imdbText += `*Director:* ${movieData.Director}\n`;
      imdbText += `*Writer:* ${movieData.Writer}\n`;
      imdbText += `*Actors:* ${movieData.Actors}\n`;
      imdbText += `*Plot:* ${movieData.Plot}\n`;
      imdbText += `*Language:* ${movieData.Language}\n`;
      imdbText += `*Country:* ${movieData.Country}\n`;
      imdbText += `*Awards:* ${movieData.Awards}\n`;
      imdbText += `*Box Office:* ${movieData.BoxOffice}\n`;
      imdbText += `*Production:* ${movieData.Production}\n`;
      imdbText += `*IMDB Rating:* ${movieData.imdbRating}\n`;
      imdbText += `*IMDB Votes:* ${movieData.imdbVotes}\n`;

      await Xploader.sendMessage(m.chat, {
        image: { url: movieData.Poster },
        caption: imdbText
      }, { quoted: m });
    } catch (error) {
      console.error('Error fetching IMDB data:', error);
      reply(`An error occurred while fetching data from IMDB. Please try again.`);
    }
  }
};