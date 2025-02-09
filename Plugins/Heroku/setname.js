
module.exports = {
    command: ['setname'],
    operate: async (context) => {
        const { m, mess, text, reply, isCreator, setHerokuEnvVar } = context;
        if (!isCreator) return reply(mess.owner);
        if (!text) return reply('*Please specify the name*\n\nExample: .setname YourName');

        const nameValue = text.trim();
        try {
            await setHerokuEnvVar("OWNER_NAME", nameValue);
            await reply(`*Owner name updated successfully*\n\`\`\`OWNER_NAME = ${nameValue}\`\`\``);
            await reply(`*Bot will restart to apply the new setting. Please wait a moment!*`);
        } catch (error) {
            await reply(`*Error updating owner name*\n${error.message}`);
        }
    }
};