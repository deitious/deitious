// XPLOADER BOT by Tylor

const fs = require('fs');

module.exports = {
  command: ['addignorelist'],
  operate: async ({ m, args, isCreator, mess, loadBlacklist, blacklistPath }) => {
    if (!isCreator) return m.reply(mess.owner); // Check if the user is the creator

    let mentionedUser = m.mentionedJid && m.mentionedJid[0];
    let quotedUser = m.quoted && m.quoted.sender;
    let userToAdd = mentionedUser || quotedUser || args[0]; // Accept phone number as argument

    if (userToAdd && !userToAdd.includes('@s.whatsapp.net')) {
      userToAdd = `${userToAdd}@s.whatsapp.net`; // Format the phone number correctly
    }

    if (!userToAdd) return m.reply('Please mention a user, reply to a user\'s message, or provide a phone number to add to the bot\'s ignore list.');

    let blacklist = loadBlacklist();

    if (!blacklist.blacklisted_numbers.includes(userToAdd)) {
      blacklist.blacklisted_numbers.push(userToAdd);
      fs.writeFileSync(blacklistPath, JSON.stringify(blacklist, null, 2));
      m.reply(`User ${userToAdd} has been added to the bot's ignore list.\n\nThe bot will no longer respond to their messages 🗿.`);
    } else {
      m.reply(`User ${userToAdd} is already in the bot's ignore list.`);
    }
  }
};