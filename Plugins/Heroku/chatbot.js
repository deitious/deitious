// XPLOADER-BOT by Tylor

module.exports = {
    command: ['chatbot'],
    operate: async (context) => {
        const { m, mess, text, isCreator, setHerokuEnvVar } = context;
        if (!isCreator) return m.reply(mess.owner);
        if (!text) return m.reply('*Please specify on/off*\n\nExample: .chatbot on');

        const chatbotValue = text.trim().toLowerCase();
        if (chatbotValue !== "on" && chatbotValue !== "off") {
            return m.reply('*Invalid value. Please specify on or off*');
        }

        try {
            const varValue = chatbotValue === "on" ? "true" : "false";
            await setHerokuEnvVar("CHATBOT", varValue);
            await m.reply(`*Chatbot setting updated successfully*\n\`\`\`CHATBOT = ${varValue.toUpperCase()}\`\`\``);
            await m.reply(`*Bot will restart to apply the new setting. Please wait a moment!*`);
        } catch (error) {
            await m.reply(`*Error updating Chatbot setting*\n${error.message}`);
        }
    }
};