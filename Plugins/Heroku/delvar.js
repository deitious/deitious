// XPLOADER-BOT by Tylor

module.exports = {
    command: ['delvar'],
    operate: async (context) => {
        const { m, full_args, isCreator, deleteHerokuEnvVar } = context;
        if (!isCreator) return;

        const varToDelete = full_args.trim();
        if (!varToDelete) return m.reply('*Please provide the variable name to delete*');

        try {
            const result = await deleteHerokuEnvVar(varToDelete);
            await m.reply(`*Environment variable deleted successfully*\n\`\`\`${varToDelete}\`\`\``);
            await m.reply(`*Bot will restart to apply the new environment variable. Please wait a moment!*`);
        } catch (error) {
            await m.reply(`*Error deleting environment variable*\n${error.message}`);
        }
    }
};