const fs = require('fs');
const path = require('path');

let deletionTimeouts = {};

module.exports = {
  command: ['delplugin', 'deleteplugin', 'canceldelete'],
  operate: async ({ m, args, reply, prefix, isCreator, command }) => {
    if (!isCreator) return reply("*You don't have permission to use this command!*");

    const pluginsDir = path.join(__dirname, '..');

    if (command === 'canceldelete') {
      if (deletionTimeouts[m.chat]) {
        clearTimeout(deletionTimeouts[m.chat]);
        delete deletionTimeouts[m.chat];
        return reply('*Plugin deletion canceled successfully.*');
      } else {
        return reply('*No plugin deletion is currently scheduled.*');
      }
    }

    if (!args[0]) {
      return reply('Usage: `.delplugin <filename>`\nExample: `.delplugin block`');
    }

    const pluginName = args[0].toLowerCase();

    try {
      let foundFile = null;

      const searchFile = (dir) => {
        const files = fs.readdirSync(dir);
        for (const file of files) {
          const fullPath = path.join(dir, file);

          if (fs.statSync(fullPath).isDirectory()) {
            searchFile(fullPath); 
          } else if (file.toLowerCase() === `${pluginName}.js`) {
            foundFile = fullPath; // File found
            break;
          }
        }
      };

      searchFile(pluginsDir);
      if (!foundFile) {
        return reply(`*Error:* Plugin "${pluginName}.js" not found.`);
      }
      const notificationMessage = `*The plugin "${pluginName}.js" will be deleted in 30 seconds.*\n\nTo stop the deletion, use the command \`${prefix}canceldelete\`.`;
      await reply(notificationMessage);

      deletionTimeouts[m.chat] = setTimeout(async () => {
        try {
          if (fs.existsSync(foundFile)) {
            fs.unlinkSync(foundFile);
            delete deletionTimeouts[m.chat];
            await reply(`*Success:* Plugin "${pluginName}.js" has been deleted.`);
          }
        } catch (err) {
          console.error(err);
          await reply(`*Error:* Could not delete "${pluginName}.js".`);
        }
      }, 30000);
    } catch (error) {
      console.error(error);
      reply('*An error occurred while trying to delete the plugin.*');
    }
  },
};