
module.exports = {
    command: ['setbotname'],
    operate: async (context) => {
        const { m, mess, text, reply, isCreator, setHerokuEnvVar } = context;
        if (!isCreator) return reply(mess.owner);
        if (!text) return reply('*Please specify the bot name*\n\nExample: .setbotname CypherX');

        const botNameValue = text.trim();
        try {
            await setHerokuEnvVar("BOT_NAME", botNameValue);
            await reply(`*Bot name updated successfully*\n\`\`\`BOT_NAME = ${botNameValue}\`\`\``);
            await reply(`*Bot will restart to apply the new setting. Please wait a moment!*`);
        } catch (error) {
            await reply(`*Error updating bot name*\n${error.message}`);
        }
    }
};