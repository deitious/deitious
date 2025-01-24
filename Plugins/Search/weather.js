// XPLOADER BOT by Tylor

const axios = require('axios'); // Import axios

module.exports = {
  command: ['weather'],
  operate: async ({ Xploader, m, reply, text }) => {
    if (!text) return reply("*Which place?*");
    
    let city = text.split(" ")[0];
    try {
      let wdata = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=060a6bcfa19809c2cd4d97a212b19273&language=en`
      );

      let textw = "";
      textw += `*🗺️Weather of ${city}*\n\n`;
      textw += `*Weather:-* ${wdata.data.weather[0].main}\n`;
      textw += `*Description:-* ${wdata.data.weather[0].description}\n`;
      textw += `*Avg Temp:-* ${wdata.data.main.temp}\n`;
      textw += `*Feels Like:-* ${wdata.data.main.feels_like}\n`;
      textw += `*Pressure:-* ${wdata.data.main.pressure}\n`;
      textw += `*Humidity:-* ${wdata.data.main.humidity}\n`;
      textw += `*Wind Speed:-* ${wdata.data.wind.speed}\n`;
      textw += `*Latitude:-* ${wdata.data.coord.lat}\n`;
      textw += `*Longitude:-* ${wdata.data.coord.lon}\n`;
      textw += `*Country:-* ${wdata.data.sys.country}\n`;

      await Xploader.sendMessage(
        m.chat,
        { text: textw },
        { quoted: m }
      );
    } catch (error) {
      console.error('Error fetching weather data:', error);
      reply("An error occurred while fetching the weather data.");
    }
  }
};