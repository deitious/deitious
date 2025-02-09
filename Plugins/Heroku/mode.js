
module.exports = {
    command: ['mode'],
    operate: async (context) => {
        const { m, mess, text, reply, isCreator, setHerokuEnvVar } = context;
        if (!isCreator) return reply(mess.owner);
        if (!text) return reply('*Please specify the mode*\n\nExample: .mode private');

        const modeValue = text.trim().toLowerCase();
        if (modeValue !== "private" && modeValue !== "public") {
            return reply('*Invalid value. Please specify private or public*');
        }

        try {
            await setHerokuEnvVar("MODE", modeValue);
            await reply(`*Mode updated successfully*\n\`\`\`MODE = ${modeValue.toUpperCase()}\`\`\``);
            await reply(`*Bot will restart to apply the new setting. Please wait a moment!*`);
        } catch (error) {
            await reply(`*Error updating mode*\n${error.message}`);
        }
    }
};