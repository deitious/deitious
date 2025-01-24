// XPLOADER-BOT by Tylor

module.exports = {
    command: ['mode'],
    operate: async (context) => {
        const { m, mess, text, isCreator, setHerokuEnvVar } = context;
        if (!isCreator) return m.reply(mess.owner);
        if (!text) return m.reply('*Please specify the mode*\n\nExample: .mode private');

        const modeValue = text.trim().toLowerCase();
        if (modeValue !== "private" && modeValue !== "public") {
            return m.reply('*Invalid value. Please specify private or public*');
        }

        try {
            await setHerokuEnvVar("MODE", modeValue);
            await m.reply(`*Mode updated successfully*\n\`\`\`MODE = ${modeValue.toUpperCase()}\`\`\``);
            await m.reply(`*Bot will restart to apply the new setting. Please wait a moment!*`);
        } catch (error) {
            await m.reply(`*Error updating mode*\n${error.message}`);
        }
    }
};