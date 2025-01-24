// XPLOADER-BOT by Tylor

module.exports = {
    command: ['setbotname'],
    operate: async (context) => {
        const { m, mess, text, isCreator, setHerokuEnvVar } = context;
        if (!isCreator) return m.reply(mess.owner);
        if (!text) return m.reply('*Please specify the bot name*\n\nExample: .setbotname MyBot');

        const botNameValue = text.trim();
        try {
            await setHerokuEnvVar("BOT_NAME", botNameValue);
            await m.reply(`*Bot name updated successfully*\n\`\`\`BOT_NAME = ${botNameValue}\`\`\``);
            await m.reply(`*Bot will restart to apply the new setting. Please wait a moment!*`);
        } catch (error) {
            await m.reply(`*Error updating bot name*\n${error.message}`);
        }
    }
};