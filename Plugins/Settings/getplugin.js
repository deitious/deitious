const fs = require('fs');
const path = require('path');

module.exports = {
  command: ['getplugin'],
  operate: async ({ m, args, Cypher, reply }) => {
    if (!args[0]) {
      return reply('Usage: `.getplugin <filename>`\nExample: `.getplugin block`');
    }

    const pluginName = args[0].toLowerCase();
    const pluginsDir = path.join(__dirname, '..'); 

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
      
      const fileContent = fs.readFileSync(foundFile, 'utf-8');

      await reply(`*Plugin Content:*\n\n\`\`\`\n${fileContent}\n\`\`\``);

      await Cypher.sendMessage(
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