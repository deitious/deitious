// XPLOADER-BOT by Tylor

module.exports = {
    command: ['anticall'],
    operate: async (context) => {
        const { m, mess, text, isCreator, setHerokuEnvVar } = context;
        if (!isCreator) return m.reply(mess.owner);
        if (!text) return m.reply('*Please specify on/off*\n\nExample: .anticall on');

        const anticallValue = text.trim().toLowerCase();
        if (anticallValue !== "on" && anticallValue !== "off") {
            return m.reply('*Invalid value. Please specify on or off*');
        }

        try {
            const varValue = anticallValue === "on" ? "true" : "false";
            const result = await setHerokuEnvVar("ANTI_CALL", varValue);
            await m.reply(`*Anti-Call setting updated successfully*\n\`\`\`ANTI_CALL = ${varValue.toUpperCase()}\`\`\``);
            await m.reply(`*Bot will restart to apply the new setting. Please wait a moment!*`);
        } catch (error) {
            await m.reply(`*Error updating Anti-Call setting*\n${error.message}`);
        }
    }
};