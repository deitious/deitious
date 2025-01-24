// XPLOADER-BOT by Tylor

module.exports = {
    command: ['setname'],
    operate: async (context) => {
        const { m, mess, text, isCreator, setHerokuEnvVar } = context;
        if (!isCreator) return m.reply(mess.owner);
        if (!text) return m.reply('*Please specify the name*\n\nExample: .setname YourName');

        const nameValue = text.trim();
        try {
            await setHerokuEnvVar("OWNER_NAME", nameValue);
            await m.reply(`*Owner name updated successfully*\n\`\`\`OWNER_NAME = ${nameValue}\`\`\``);
            await m.reply(`*Bot will restart to apply the new setting. Please wait a moment!*`);
        } catch (error) {
            await m.reply(`*Error updating owner name*\n${error.message}`);
        }
    }
};