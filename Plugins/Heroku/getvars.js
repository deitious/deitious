// XPLOADER-BOT by Tylor

module.exports = {
    command: ['getvar', 'getvars'],
    operate: async (context) => {
        const { m, isCreator, getHerokuEnvVars } = context;
        if (!isCreator) return;

        try {
            const envVars = await getHerokuEnvVars();
            const formattedVars = Object.entries(envVars)
                .map(([key, value]) => `${key} = ${value}`)
                .join('\n');
            await m.reply(`*Current Environment Variables:*\n\`\`\`${formattedVars}\`\`\``);
        } catch (error) {
            await m.reply(`*Error getting environment variables*\n${error.message}`);
        }
    }
};