
module.exports = {
    command: ['getvar', 'getvars'],
    operate: async (context) => {
        const { m, isCreator, reply, getHerokuEnvVars } = context;
        if (!isCreator) return;

        try {
            const envVars = await getHerokuEnvVars();
            const formattedVars = Object.entries(envVars)
                .map(([key, value]) => `${key} = ${value}`)
                .join('\n');
            await reply(`*Current Environment Variables:*\n\`\`\`${formattedVars}\`\`\``);
        } catch (error) {
            await reply(`*Error getting environment variables*\n${error.message}`);
        }
    }
};