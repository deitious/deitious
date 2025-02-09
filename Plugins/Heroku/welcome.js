
module.exports = {
    command: ['welcome'],
    operate: async (context) => {
        const { m, mess, reply, text, isCreator, setHerokuEnvVar } = context;
        if (!isCreator) return reply(mess.owner);
        if (!text) return reply('*Please specify on/off*\n\nExample: .welcome on');

        const welcomeValue = text.trim().toLowerCase();
        if (welcomeValue !== "on" && welcomeValue !== "off") {
            return reply('*Invalid value. Please specify on or off*');
        }

        try {
            const varValue = welcomeValue === "on" ? "true" : "false";
            await setHerokuEnvVar("WELCOME_MSG", varValue);
            await reply(`*Welcome Message setting updated successfully*\n\`\`\`WELCOME_MSG = ${varValue.toUpperCase()}\`\`\``);
            await reply(`*Bot will restart to apply the new setting. Please wait a moment!*`);
        } catch (error) {
            await reply(`*Error updating Welcome Message setting*\n${error.message}`);
        }
    }
};