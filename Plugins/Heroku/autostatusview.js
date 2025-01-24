// XPLOADER-BOT by Tylor

module.exports = {
    command: ['autostatusview'],
    operate: async (context) => {
        const { m, mess, text, isCreator, setHerokuEnvVar } = context;
        if (!isCreator) return m.reply(mess.owner);
        if (!text) return m.reply('*Please specify on/off*\n\nExample: .autostatusview on');

        const autoStatusViewValue = text.trim().toLowerCase();
        if (autoStatusViewValue !== "on" && autoStatusViewValue !== "off") {
            return m.reply('*Invalid value. Please specify on or off*');
        }

        try {
            const varValue = autoStatusViewValue === "on" ? "true" : "false";
            await setHerokuEnvVar("AUTO_STATUS_VIEW", varValue);
            await m.reply(`*Auto-Status View setting updated successfully*\n\`\`\`AUTO_STATUS_VIEW = ${varValue.toUpperCase()}\`\`\``);
            await m.reply(`*Bot will restart to apply the new setting. Please wait a moment!*`);
        } catch (error) {
            await m.reply(`*Error updating Auto-Status View setting*\n${error.message}`);
        }
    }
};