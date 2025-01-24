const fs = require('fs');
const path = require('path');

module.exports = {
  command: ['getplugin'],
  operate: async ({ m, args, Xploader, reply }) => {
    if (!args[0]) {
      return reply('Usage: `.getplugin <filename>`\nExample: `.getplugin block`');
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

      // Read the file content
      const fileContent = fs.readFileSync(foundFile, 'utf-8');

      // Send the file content as text
      await reply(`*Plugin Content:*\n\n\`\`\`\n${fileContent}\n\`\`\``);

      // Send the file as a document
      await Xploader.sendMessage(
        m.chat,
        {
          document: fs.readFileSync(foundFile),
          fileName: `${pluginName}.js`,
          mimetype: 'application/javascript',
        },
        { quoted: m }
      );
    } catch (error) {
      console.error(error);
      reply('*An error occurred while retrieving the plugin.*');
    }
  },
};