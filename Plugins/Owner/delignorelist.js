
const fs = require('fs');

module.exports = {
  command: ['delignorelist'],
  operate: async ({ m, args, isCreator, mess, loadBlacklist, blacklistPath, reply }) => {
    if (!isCreator) return reply(mess.owner); 
    let mentionedUser = m.mentionedJid && m.mentionedJid[0];
    let quotedUser = m.quoted && m.quoted.sender;
    let userToRemove = mentionedUser || quotedUser || args[0]; 

    if (userToRemove && !userToRemove.includes('@s.whatsapp.net')) {
      userToRemove = `${userToRemove}@s.whatsapp.net`; 
    }

    if (!userToRemove) return reply('Please mention a user, reply to a user\'s message, or provide a phone number to remove from the bot\'s ignore list.');

    let blacklist = loadBlacklist();

    if (blacklist.blacklisted_numbers.includes(userToRemove)) {
      blacklist.blacklisted_numbers = blacklist.blacklisted_numbers.filter(number => number !== userToRemove);
      fs.writeFileSync(blacklistPath, JSON.stringify(blacklist, null, 2));
      reply(`User ${userToRemove} has been removed from the bot's ignore list.`);
    } else {
      reply(`User ${userToRemove} is not in the bot's ignore list.`);
    }
  }
};