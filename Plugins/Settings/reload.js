const path = require('path');

module.exports = {
  command: ['reload'],
  operate: async ({ m, reply, isCreator, args }) => {
    if (!isCreator) return reply("*You don't have permission to use this command!*");

    if (args.length === 0) return reply("*Please specify a file to reload! For example: Xploader, index.js, core.js, settings.js*");

    try {
      const fileName = args[0].toLowerCase();
      let filePath;

      switch (fileName) {
        case 'xploader':
        case 'xploader.js':
          filePath = path.resolve(__dirname, '..', '..', 'Xploader.js');
          break;
        case 'index':
        case 'index.js':
          filePath = path.resolve(__dirname, '..', '..', 'index.js');
          break;
        case 'core':
        case 'core.js':
          filePath = path.resolve(__dirname, '..', '..', 'core.js');
          break;
        case 'settings':
        case 'settings.js':
          filePath = path.resolve(__dirname, '..', '..', 'settings.js');
          break;
        default:
          return reply("*Invalid file specified! Please provide a valid file name.*");
      }

      delete require.cache[require.resolve(filePath)];

      require(filePath);

      console.log(`File ${fileName} reloaded successfully!`);
      reply(`File ${fileName} reloaded successfully!`);
    } catch (err) {
      console.error(`Error reloading the file ${args[0]}:`, err);
      reply(`Error reloading the file ${args[0]}. Check logs for details.`);
    }
  }
};