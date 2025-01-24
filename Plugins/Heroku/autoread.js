// XPLOADER-BOT by Tylor

module.exports = {
    command: ['autoread'],
    operate: async (context) => {
        const { m, mess, text, isCreator, setHerokuEnvVar } = context;
        if (!isCreator) return m.reply(mess.owner);
        if (!text) return m.reply('*Please specify on/off*\n\nExample: .autoread on');

        const autoreadValue = text.trim().toLowerCase();
        if (autoreadValue !== "on" && autoreadValue !== "off") {
            return m.reply('*Invalid value. Please specify on or off*');
        }

        try {
            const varValue = autoreadValue === "on" ? "true" : "false";
            await setHerokuEnvVar("AUTO_READ", varValue);
            await m.reply(`*Auto-Read setting updated successfully*\n\`\`\`AUTO_READ = ${varValue.toUpperCase()}\`\`\``);
            await m.reply(`*Bot will restart to apply the new setting. Please wait a moment!*`);
        } catch (error) {
            await m.reply(`*Error updating Auto-Read setting*\n${error.message}`);
        }
    }
};