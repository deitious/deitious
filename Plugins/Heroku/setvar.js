
module.exports = {
    command: ['setvar'],
    operate: async (context) => {
        const { m, full_args, reply, isCreator, setHerokuEnvVar } = context;
        if (!isCreator) return;

        const [varName, varValue] = full_args.split('=');
        if (!varName || !varValue) {
            return reply(`*Please provide a variable name and value*\n\nExample: .setvar ANTI_CALL = false`);
        }

        try {
            const result = await setHerokuEnvVar(varName.trim(), varValue.trim());
            await reply(`*Environment variable set successfully*\n\`\`\`${varName} = ${varValue}\`\`\``);
            await reply(`*Bot will restart to apply the new environment variable. Please wait a moment!*`);
        } catch (error) {
            await reply(`*Error setting environment variable*\n${error.message}`);
        }
    }
};