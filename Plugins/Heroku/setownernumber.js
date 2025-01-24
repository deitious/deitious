// XPLOADER-BOT by Tylor

module.exports = {
    command: ['setownernumber'],
    operate: async (context) => {
        const { m, mess, text, isCreator, setHerokuEnvVar } = context;
        if (!isCreator) return m.reply(mess.owner);
        if (!text) return m.reply('*Please specify the owner number*\n\nExample: .setownernumber 1234567890');

        const ownerNumberValue = text.trim();
        try {
            await setHerokuEnvVar("OWNER_NUMBER", ownerNumberValue);
            await m.reply(`*Owner number updated successfully*\n\`\`\`OWNER_NUMBER = ${ownerNumberValue}\`\`\``);
            await m.reply(`*Bot will restart to apply the new setting. Please wait a moment!*`);
        } catch (error) {
            await m.reply(`*Error updating owner number*\n${error.message}`);
        }
    }
};