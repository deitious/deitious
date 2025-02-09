
module.exports = {
    command: ['anticall'],
    operate: async (context) => {
        const { m, mess, text, reply, isCreator, setHerokuEnvVar } = context;
        if (!isCreator) return reply(mess.owner);
        if (!text) return reply('*Please specify on/off*\n\nExample: .anticall on');

        const anticallValue = text.trim().toLowerCase();
        if (anticallValue !== "on" && anticallValue !== "off") {
            return reply('*Invalid value. Please specify on or off*');
        }

        try {
            const varValue = anticallValue === "on" ? "true" : "false";
            const result = await setHerokuEnvVar("ANTI_CALL", varValue);
            await reply(`*Anti-Call setting updated successfully*\n\`\`\`ANTI_CALL = ${varValue.toUpperCase()}\`\`\``);
            await reply(`*Bot will restart to apply the new setting. Please wait a moment!*`);
        } catch (error) {
            await reply(`*Error updating Anti-Call setting*\n${error.message}`);
        }
    }
};