const fs = require('fs/promises');

module.exports = {
  command: ['deletebadword'],
  operate: async ({ Cypher, m, isCreator, mess, prefix, args, q, bad, reply }) => {
    if (!isCreator) return reply(mess.owner);
    if (args.length < 1) return reply(`Use ${prefix}deletebadword [harsh word].`);

    const index = bad.indexOf(q);
    if (index === -1) {
      return reply('This word is not in the list!');
    }

    bad.splice(index, 1);

    try {
      await fs.writeFile('./src/badwords.json', JSON.stringify(bad, null, 2));
      reply('Successfully deleted bad word!');
    } catch (error) {
      console.error('Error writing to badwords.json:', error);
      reply('An error occurred while deleting the bad word.');
    }
  }
};