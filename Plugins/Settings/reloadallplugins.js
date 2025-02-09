const fs = require('fs');
const path = require('path');

module.exports = {
  command: ['reloadallplugins'],
  operate: async ({ m, reply, isCreator }) => {
    if (!isCreator) return reply("*You don't have permission to use this command!*");

    const pluginsDir = path.join(__dirname, '..'); 

    try {
      const unloadedPlugins = [];
      const reloadedPlugins = [];

      const searchPlugins = (dir) => {
        const files = fs.readdirSync(dir);
        for (const file of files) {
          const fullPath = path.join(dir, file);

          if (fs.statSync(fullPath).isDirectory()) {
            searchPlugins(fullPath); 
          } else if (file.endsWith('.js')) {
            try {
              delete require.cache[require.resolve(fullPath)];

              require(fullPath);

              reloadedPlugins.push(file);
            } catch (err) {
              unloadedPlugins.push(file); 
              console.error(`Error reloading ${file}:`, err);
            }
          }
        }
      };

      searchPlugins(pluginsDir);

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