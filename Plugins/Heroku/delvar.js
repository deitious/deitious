
module.exports = {
    command: ['delvar'],
    operate: async (context) => {
        const { m, full_args, reply, isCreator, deleteHerokuEnvVar } = context;
        if (!isCreator) return;

        const varToDelete = full_args.trim();
        if (!varToDelete) return reply('*Please provide the variable name to delete*');

        try {
            const result = await deleteHerokuEnvVar(varToDelete);
            await reply(`*Environment variable deleted successfully*\n\`\`\`${varToDelete}\`\`\``);
            await reply(`*Bot will restart to apply the new environment variable. Please wait a moment!*`);
        } catch (error) {
            await reply(`*Error deleting environment variable*\n${error.message}`);
        }
    }
};