
module.exports = {
    command: ['alwaysonline'],
    operate: async (context) => {
        const { m, mess, text, reply, isCreator, setHerokuEnvVar } = context;
        if (!isCreator) return reply(mess.owner);
        if (!text) return reply('*Please specify on/off*\n\nExample: .alwaysonline on');

        const alwaysOnlineValue = text.trim().toLowerCase();
        if (alwaysOnlineValue !== "on" && alwaysOnlineValue !== "off") {
            return reply('*Invalid value. Please specify on or off*');
        }

        try {
            const varValue = alwaysOnlineValue === "on" ? "true" : "false";
            await setHerokuEnvVar("ALWAYS_ONLINE", varValue);
            await reply(`*Always Online setting updated successfully*\n\`\`\`ALWAYS_ONLINE = ${varValue.toUpperCase()}\`\`\``);
            await reply(`*Bot will restart to apply the new setting. Please wait a moment!*`);
        } catch (error) {
            await reply(`*Error updating Always Online setting*\n${error.message}`);
        }
    }
};