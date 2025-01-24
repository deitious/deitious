// XPLOADER-BOT by Tylor

module.exports = {
    command: ['alwaysonline'],
    operate: async (context) => {
        const { m, mess, text, isCreator, setHerokuEnvVar } = context;
        if (!isCreator) return m.reply(mess.owner);
        if (!text) return m.reply('*Please specify on/off*\n\nExample: .alwaysonline on');

        const alwaysOnlineValue = text.trim().toLowerCase();
        if (alwaysOnlineValue !== "on" && alwaysOnlineValue !== "off") {
            return m.reply('*Invalid value. Please specify on or off*');
        }

        try {
            const varValue = alwaysOnlineValue === "on" ? "true" : "false";
            await setHerokuEnvVar("ALWAYS_ONLINE", varValue);
            await m.reply(`*Always Online setting updated successfully*\n\`\`\`ALWAYS_ONLINE = ${varValue.toUpperCase()}\`\`\``);
            await m.reply(`*Bot will restart to apply the new setting. Please wait a moment!*`);
        } catch (error) {
            await m.reply(`*Error updating Always Online setting*\n${error.message}`);
        }
    }
};