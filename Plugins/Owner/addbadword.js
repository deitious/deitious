const fs = require('fs/promises');

module.exports = {
  command: ['addbadword'],
  operate: async ({ Xploader, m, isCreator, mess, prefix, args, q, bad }) => {
    if (!isCreator) return m.reply(mess.owner);
    if (args.length < 1) return m.reply(`Use ${prefix}addbadword [harsh word].`);

    // Check if the bad word already exists
    if (bad.includes(q)) {
      return m.reply('This word is already in the list!');
    }

    // Add the bad word to the list
    bad.push(q);

    try {
      // Asynchronously write the updated bad word list to the JSON file
      await fs.writeFile('./src/badwords.json', JSON.stringify(bad, null, 2));
      m.reply('Successfully added bad word!');
    } catch (error) {
      console.error('Error writing to badwords.json:', error);
      m.reply('An error occurred while adding the bad word.');
    }
  }
};