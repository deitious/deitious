// XPLOADER BOT by Tylor

module.exports = {
  command: ['listignorelist'],
  operate: async ({ m, isCreator, mess, loadBlacklist }) => {
    if (!isCreator) return m.reply(mess.owner); // Check if the user is the creator

    let blacklist = loadBlacklist();

    if (blacklist.blacklisted_numbers.length === 0) {
      m.reply('The ignore list is currently empty.');
    } else {
      let blacklistMessage = 'Ignored Numbers:\n';
      blacklist.blacklisted_numbers.forEach((number, index) => {
        blacklistMessage += `${index + 1}. ${number}\n`;
      });
      m.reply(blacklistMessage);
    }
  }
};