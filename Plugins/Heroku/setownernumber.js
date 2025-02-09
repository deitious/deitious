
module.exports = {
    command: ['setownernumber'],
    operate: async (context) => {
        const { m, mess, text, reply, isCreator, setHerokuEnvVar } = context;
        if (!isCreator) return reply(mess.owner);
        if (!text) return reply('*Please specify the owner number*\n\nExample: .setownernumber 1234567890');

        const ownerNumberValue = text.trim();
        try {
            await setHerokuEnvVar("OWNER_NUMBER", ownerNumberValue);
            await reply(`*Owner number updated successfully*\n\`\`\`OWNER_NUMBER = ${ownerNumberValue}\`\`\``);
            await reply(`*Bot will restart to apply the new setting. Please wait a moment!*`);
        } catch (error) {
            await reply(`*Error updating owner number*\n${error.message}`);
        }
    }
};