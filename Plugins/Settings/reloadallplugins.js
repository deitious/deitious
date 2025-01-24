const fs = require('fs');
const path = require('path');

module.exports = {
  command: ['reloadallplugins'],
  operate: async ({ m, Xploader, reply, isCreator }) => {
    if (!isCreator) return reply("*You don't have permission to use this command!*");

    const pluginsDir = path.join(__dirname, '..'); // Base Plugins directory

    try {
      const unloadedPlugins = [];
      const reloadedPlugins = [];

      // Recursively search for all .js files in the plugins directory
      const searchPlugins = (dir) => {
        const files = fs.readdirSync(dir);
        for (const file of files) {
          const fullPath = path.join(dir, file);

          if (fs.statSync(fullPath).isDirectory()) {
            searchPlugins(fullPath); // Recursive call for subdirectories
          } else if (file.endsWith('.js')) {
            try {
              // Unload the plugin
              delete require.cache[require.resolve(fullPath)];

              // Reload the plugin
              require(fullPath);

              reloadedPlugins.push(file); // Add to reloaded list
            } catch (err) {
              unloadedPlugins.push(file); // Add to error list
              console.error(`Error reloading ${file}:`, err);
            }
          }
        }
      };

      searchPlugins(pluginsDir);

      // Create a response message
      let response = `*Reload All Plugins Result:*\n\n`;
      response += `*Reloaded Plugins:*\n${reloadedPlugins.map((p) => `- ${p}`).join('\n') || 'None'}\n\n`;
      if (unloadedPlugins.length > 0) {
        response += `*Failed to Reload:*\n${unloadedPlugins.map((p) => `- ${p}`).join('\n')}`;
      } else {
        response += `*All plugins reloaded successfully!*`;
      }

      reply(response);
    } catch (error) {
      console.error(error);
      reply('*An error occurred while trying to reload all plugins.*');
    }
  },
};