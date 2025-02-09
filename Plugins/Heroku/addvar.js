
module.exports = {
    command: ['addvar'],
    operate: async (context) => {
        const { m, full_args, reply, isCreator, setHerokuEnvVar } = context;
        if (!isCreator) return;

        const [newVarName, newVarValue] = full_args.split('=');
        if (!newVarName || !newVarValue) {
            return reply(`*Please provide a variable name and value*\n\nExample: .addvar NEW_VAR = value`);
        }

        try {
            const result = await setHerokuEnvVar(newVarName.trim(), newVarValue.trim());
            await reply(`*Environment variable added successfully*\n\`\`\`${newVarName} = ${newVarValue}\`\`\``);
            await reply(`*Bot will restart to apply the new environment variable. Please wait a moment!*`);
        } catch (error) {
            await reply(`*Error adding environment variable*\n${error.message}`);
        }
    }
};