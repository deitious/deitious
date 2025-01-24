const fs = require('fs/promises');

module.exports = {
  command: ['deletebadword'],
  operate: async ({ Xploader, m, isCreator, mess, prefix, args, q, bad }) => {
    if (!isCreator) return m.reply(mess.owner);
    if (args.length < 1) return m.reply(`Use ${prefix}deletebadword [harsh word].`);

    // Check if the bad word exists
    const index = bad.indexOf(q);
    if (index === -1) {
      return m.reply('This word is not in the list!');
    }

    // Remove the bad word from the list
    bad.splice(index, 1);

    try {
      // Asynchronously write the updated bad word list to the JSON file
      await fs.writeFile('./src/badwords.json', JSON.stringify(bad, null, 2));
      m.reply('Successfully deleted bad word!');
    } catch (error) {
      console.error('Error writing to badwords.json:', error);
      m.reply('An error occurred while deleting the bad word.');
    }
  }
};