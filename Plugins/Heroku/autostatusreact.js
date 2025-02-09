
module.exports = {
    command: ['autostatusreact'],
    operate: async (context) => {
        const { m, mess, text, reply, isCreator, setHerokuEnvVar } = context;
        if (!isCreator) return reply(mess.owner);
        if (!text) return reply('*Please specify on/off*\n\nExample: .autostatusreact on');

        const autoStatusReactValue = text.trim().toLowerCase();
        if (autoStatusReactValue !== "on" && autoStatusReactValue !== "off") {
            return reply('*Invalid value. Please specify on or off*');
        }

        try {
            const varValue = autoStatusReactValue === "on" ? "true" : "false";
            await setHerokuEnvVar("AUTO_STATUS_REACT", varValue);
            await reply(`*Auto-Status React setting updated successfully*\n\`\`\`AUTO_STATUS_REACT = ${varValue.toUpperCase()}\`\`\``);
            await reply(`*Bot will restart to apply the new setting. Please wait a moment!*`);
        } catch (error) {
            await reply(`*Error updating Auto-Status React setting*\n${error.message}`);
        }
    }
};