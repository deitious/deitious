// XPLOADER-BOT by Tylor

module.exports = {
    command: ['addvar'],
    operate: async (context) => {
        const { m, full_args, isCreator, setHerokuEnvVar } = context;
        if (!isCreator) return;

        const [newVarName, newVarValue] = full_args.split('=');
        if (!newVarName || !newVarValue) {
            return m.reply(`*Please provide a variable name and value*\n\nExample: .addvar NEW_VAR = value`);
        }

        try {
            const result = await setHerokuEnvVar(newVarName.trim(), newVarValue.trim());
            await m.reply(`*Environment variable added successfully*\n\`\`\`${newVarName} = ${newVarValue}\`\`\``);
            await m.reply(`*Bot will restart to apply the new environment variable. Please wait a moment!*`);
        } catch (error) {
            await m.reply(`*Error adding environment variable*\n${error.message}`);
        }
    }
};