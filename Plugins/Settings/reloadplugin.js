const fs = require('fs');
const path = require('path');

module.exports = {
  command: ['reloadplugin'],
  operate: async ({ m, args, Xploader, reply, isCreator }) => {
    if (!isCreator) return reply("*You don't have permission to use this command!*");

    if (!args[0]) {
      return reply('Usage: `.reloadplugin <plugin_name>`\nExample: `.reloadplugin block`');
    }

    const pluginName = args[0].toLowerCase();
    const pluginsDir = path.join(__dirname, '..'); // Base Plugins directory

    try {
      let foundFile = null;

      // Recursively search for the file
      const searchFile = (dir) => {
        const files = fs.readdirSync(dir);
        for (const file of files) {
          const fullPath = path.join(dir, file);

          if (fs.statSync(fullPath).isDirectory()) {
            searchFile(fullPath); // Recursive call for subdirectories
          } else if (file.toLowerCase() === `${pluginName}.js`) {
            foundFile = fullPath; // File found
            break;
          }
        }
      };

      searchFile(pluginsDir);

      // If the file is not found
      if (!foundFile) {
        return reply(`*Error:* Plugin "${pluginName}.js" not found.`);
      }

      // Unload the plugin
      delete require.cache[require.resolve(foundFile)];

      // Reload the plugin
      require(foundFile);

      reply(`*Success:* Plugin "${pluginName}.js" has been reloaded.`);
    } catch (error) {
      console.error(error);
      reply('*An error occurred while trying to reload the plugin.*');
    }
  },
};