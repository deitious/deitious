// XPLOADER-BOT by Tylor

module.exports = {
    command: ['setprefix'],
    operate: async (context) => {
        const { m, mess, text, isCreator, setHerokuEnvVar } = context;
        if (!isCreator) return m.reply(mess.owner);
        if (!text) return m.reply('*Please specify the prefix*\n\nExample: .setprefix !');

        const prefixValue = text.trim();
        try {
            await setHerokuEnvVar("PREFIX", prefixValue);
            await m.reply(`*Prefix updated successfully*\n\`\`\`PREFIX = ${prefixValue}\`\`\``);
            await m.reply(`*Bot will restart to apply the new setting. Please wait a moment!*`);
        } catch (error) {
            await m.reply(`*Error updating prefix*\n${error.message}`);
        }
    }
};