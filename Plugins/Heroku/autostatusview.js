
module.exports = {
    command: ['autostatusview'],
    operate: async (context) => {
        const { m, mess, text, reply, isCreator, setHerokuEnvVar } = context;
        if (!isCreator) return reply(mess.owner);
        if (!text) return reply('*Please specify on/off*\n\nExample: .autostatusview on');

        const autoStatusViewValue = text.trim().toLowerCase();
        if (autoStatusViewValue !== "on" && autoStatusViewValue !== "off") {
            return reply('*Invalid value. Please specify on or off*');
        }

        try {
            const varValue = autoStatusViewValue === "on" ? "true" : "false";
            await setHerokuEnvVar("AUTO_STATUS_VIEW", varValue);
            await reply(`*Auto-Status View setting updated successfully*\n\`\`\`AUTO_STATUS_VIEW = ${varValue.toUpperCase()}\`\`\``);
            await reply(`*Bot will restart to apply the new setting. Please wait a moment!*`);
        } catch (error) {
            await reply(`*Error updating Auto-Status View setting*\n${error.message}`);
        }
    }
};