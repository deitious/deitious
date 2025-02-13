module.exports = {
  command: ['antidelete'],
  operate: async (context) => {
    const { m, mess, text, reply, isCreator, setHerokuEnvVar } = context;
    if (!isCreator) return reply(mess.owner);
    if (!text) return reply('*Please specify the antidelete mode*\n\nExample: .antidelete private');

    const modeValue = text.trim().toLowerCase();
    const validModes = ['private', 'chat', 'off'];

    if (!validModes.includes(modeValue)) {
      return reply('*Invalid value. Please specify private, chat, or off*');
    }

    try {
      await setHerokuEnvVar("ANTIDELETE", modeValue);
      await reply(`*Antidelete mode updated successfully*\n\`\`\`ANTIDELETE = ${modeValue.toUpperCase()}\`\`\``);
      await reply(`*Bot will restart to apply the new setting. Please wait a moment!*`);
    } catch (error) {
      await reply(`*Error updating antidelete mode*\n${error.message}`);
    }
  }
};