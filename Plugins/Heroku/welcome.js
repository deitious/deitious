// XPLOADER-BOT by Tylor

module.exports = {
    command: ['welcome'],
    operate: async (context) => {
        const { m, mess, text, isCreator, setHerokuEnvVar } = context;
        if (!isCreator) return m.reply(mess.owner);
        if (!text) return m.reply('*Please specify on/off*\n\nExample: .welcome on');

        const welcomeValue = text.trim().toLowerCase();
        if (welcomeValue !== "on" && welcomeValue !== "off") {
            return m.reply('*Invalid value. Please specify on or off*');
        }

        try {
            const varValue = welcomeValue === "on" ? "true" : "false";
            await setHerokuEnvVar("WELCOME_MSG", varValue);
            await m.reply(`*Welcome Message setting updated successfully*\n\`\`\`WELCOME_MSG = ${varValue.toUpperCase()}\`\`\``);
            await m.reply(`*Bot will restart to apply the new setting. Please wait a moment!*`);
        } catch (error) {
            await m.reply(`*Error updating Welcome Message setting*\n${error.message}`);
        }
    }
};