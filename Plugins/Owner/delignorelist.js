// XPLOADER BOT by Tylor

const fs = require('fs');

module.exports = {
  command: ['delignorelist'],
  operate: async ({ m, args, isCreator, mess, loadBlacklist, blacklistPath }) => {
    if (!isCreator) return m.reply(mess.owner); // Check if the user is the creator

    let mentionedUser = m.mentionedJid && m.mentionedJid[0];
    let quotedUser = m.quoted && m.quoted.sender;
    let userToRemove = mentionedUser || quotedUser || args[0]; // Accept phone number as argument

    if (userToRemove && !userToRemove.includes('@s.whatsapp.net')) {
      userToRemove = `${userToRemove}@s.whatsapp.net`; // Format the phone number correctly
    }

    if (!userToRemove) return m.reply('Please mention a user, reply to a user\'s message, or provide a phone number to remove from the bot\'s ignore list.');

    let blacklist = loadBlacklist();

    if (blacklist.blacklisted_numbers.includes(userToRemove)) {
      blacklist.blacklisted_numbers = blacklist.blacklisted_numbers.filter(number => number !== userToRemove);
      fs.writeFileSync(blacklistPath, JSON.stringify(blacklist, null, 2));
      m.reply(`User ${userToRemove} has been removed from the bot's ignore list.`);
    } else {
      m.reply(`User ${userToRemove} is not in the bot's ignore list.`);
    }
  }
};