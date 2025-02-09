
module.exports = {
    command: ['autoread'],
    operate: async (context) => {
        const { m, mess, text, reply, isCreator, setHerokuEnvVar } = context;
        if (!isCreator) return reply(mess.owner);
        if (!text) return reply('*Please specify on/off*\n\nExample: .autoread on');

        const autoreadValue = text.trim().toLowerCase();
        if (autoreadValue !== "on" && autoreadValue !== "off") {
            return reply('*Invalid value. Please specify on or off*');
        }

        try {
            const varValue = autoreadValue === "on" ? "true" : "false";
            await setHerokuEnvVar("AUTO_READ", varValue);
            await reply(`*Auto-Read setting updated successfully*\n\`\`\`AUTO_READ = ${varValue.toUpperCase()}\`\`\``);
            await reply(`*Bot will restart to apply the new setting. Please wait a moment!*`);
        } catch (error) {
            await reply(`*Error updating Auto-Read setting*\n${error.message}`);
        }
    }
};