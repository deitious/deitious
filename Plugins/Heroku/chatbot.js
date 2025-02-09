
module.exports = {
    command: ['chatbot'],
    operate: async (context) => {
        const { m, mess, text, reply, isCreator, setHerokuEnvVar } = context;
        if (!isCreator) return reply(mess.owner);
        if (!text) return reply('*Please specify on/off*\n\nExample: .chatbot on');

        const chatbotValue = text.trim().toLowerCase();
        if (chatbotValue !== "on" && chatbotValue !== "off") {
            return reply('*Invalid value. Please specify on or off*');
        }

        try {
            const varValue = chatbotValue === "on" ? "true" : "false";
            await setHerokuEnvVar("CHATBOT", varValue);
            await reply(`*Chatbot setting updated successfully*\n\`\`\`CHATBOT = ${varValue.toUpperCase()}\`\`\``);
            await reply(`*Bot will restart to apply the new setting. Please wait a moment!*`);
        } catch (error) {
            await reply(`*Error updating Chatbot setting*\n${error.message}`);
        }
    }
};