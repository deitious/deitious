// XPLOADER-BOT


module.exports = {
  command: ['setsudo'],
  operate: async ({ Xploader, m, reply, isCreator, mess, text, setHerokuEnvVar }) => {
    if (!isCreator) return reply(mess.owner);
    if (!text) return reply('*Please specify the number*\n\nExample: .setsudo 1234567890 or .setsudo 1234567890,0987654321');
    
    const sudoNumberValue = text.trim();
    try {
      await setHerokuEnvVar("SUDO", sudoNumberValue);
      await reply(`*Owner number updated successfully*\n\`\`\`SUDO= ${sudoNumberValue}\`\`\``);
      await reply(`*Bot will restart to apply the new setting. Please wait a moment!*`);
    } catch (error) {
      await reply(`*Error updating sudo number*\n${error.message}`);
    }
  }
};