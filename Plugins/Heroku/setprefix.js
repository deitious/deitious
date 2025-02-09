
module.exports = {
    command: ['setprefix'],
    operate: async (context) => {
        const { m, mess, text, reply, isCreator, setHerokuEnvVar } = context;
        if (!isCreator) return reply(mess.owner);
        if (!text) return reply('*Please specify the prefix*\n\nExample: .setprefix !');

        const prefixValue = text.trim();
        try {
            await setHerokuEnvVar("PREFIX", prefixValue);
            await reply(`*Prefix updated successfully*\n\`\`\`PREFIX = ${prefixValue}\`\`\``);
            await reply(`*Bot will restart to apply the new setting. Please wait a moment!*`);
        } catch (error) {
            await reply(`*Error updating prefix*\n${error.message}`);
        }
    }
};