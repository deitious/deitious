// XPLOADER-BOT by Tylor

module.exports = {
    command: ['autostatusreact'],
    operate: async (context) => {
        const { m, mess, text, isCreator, setHerokuEnvVar } = context;
        if (!isCreator) return m.reply(mess.owner);
        if (!text) return m.reply('*Please specify on/off*\n\nExample: .autostatusreact on');

        const autoStatusReactValue = text.trim().toLowerCase();
        if (autoStatusReactValue !== "on" && autoStatusReactValue !== "off") {
            return m.reply('*Invalid value. Please specify on or off*');
        }

        try {
            const varValue = autoStatusReactValue === "on" ? "true" : "false";
            await setHerokuEnvVar("AUTO_STATUS_REACT", varValue);
            await m.reply(`*Auto-Status React setting updated successfully*\n\`\`\`AUTO_STATUS_REACT = ${varValue.toUpperCase()}\`\`\``);
            await m.reply(`*Bot will restart to apply the new setting. Please wait a moment!*`);
        } catch (error) {
            await m.reply(`*Error updating Auto-Status React setting*\n${error.message}`);
        }
    }
};