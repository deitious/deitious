// XPLOADER-BOT by Tylor

module.exports = {
    command: ['setvar'],
    operate: async (context) => {
        const { m, full_args, isCreator, setHerokuEnvVar } = context;
        if (!isCreator) return;

        const [varName, varValue] = full_args.split('=');
        if (!varName || !varValue) {
            return m.reply(`*Please provide a variable name and value*\n\nExample: .setvar ANTI_CALL = false`);
        }

        try {
            const result = await setHerokuEnvVar(varName.trim(), varValue.trim());
            await m.reply(`*Environment variable set successfully*\n\`\`\`${varName} = ${varValue}\`\`\``);
            await m.reply(`*Bot will restart to apply the new environment variable. Please wait a moment!*`);
        } catch (error) {
            await m.reply(`*Error setting environment variable*\n${error.message}`);
        }
    }
};