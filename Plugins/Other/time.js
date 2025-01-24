// XPLOADER BOT by Tylor

const moment = require('moment-timezone');

module.exports = {
  command: ['time', 'date'],
  operate: async (context) => {
    const { Xploader, m, reply } = context;

    const xpday = moment(Date.now()).tz(global.timezones).locale('en').format('dddd');
    const xptime = moment(Date.now()).tz(global.timezones).locale('en').format('HH:mm:ss z');
    const lowq = `𝗧𝗜𝗠𝗘:\n${xptime}\n\n𝗗𝗔𝗧𝗘:\n${xpday}`;

    try {
      m.reply(lowq);
    } catch (error) {
      console.error('Error sending time and date message:', error);
      m.reply('An error occurred while fetching the time and date.');
    }
  }
};