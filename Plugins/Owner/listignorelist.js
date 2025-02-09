
module.exports = {
  command: ['listignorelist'],
  operate: async ({ m, isCreator, mess, loadBlacklist, reply }) => {
    if (!isCreator) return reply(mess.owner);
    let blacklist = loadBlacklist();

    if (blacklist.blacklisted_numbers.length === 0) {
      reply('The ignore list is currently empty.');
    } else {
      let blacklistMessage = 'Ignored Numbers:\n';
      blacklist.blacklisted_numbers.forEach((number, index) => {
        blacklistMessage += `${index + 1}. ${number}\n`;
      });
      reply(blacklistMessage);
    }
  }
};