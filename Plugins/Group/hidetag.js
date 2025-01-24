// XPLOADER-BOT 

module.exports = {
    command: ['hidetag', 'tag'], 
    operate: async (context) => {
        const { m, isAdmins, isGroupOwner, isCreator, mess, participants, Xploader, isBotAdmins } = context;

        // Check if the message is in a group
        if (!m.isGroup) return m.reply(mess.group);

        // Check for required permissions
        if (!isAdmins && !isGroupOwner && !isCreator) return m.reply(mess.admin);
        if (!isBotAdmins) return m.reply(mess.admin);

        // Get text from the quoted message or provided input
        const quotedText = m.quoted ? m.quoted.text : null;
        const providedText = m.text?.split(" ").slice(1).join(" ") || null;

        // Determine the text to send
        const textToSend = quotedText || providedText || "No message provided";

        // Send the message with mentions
        await Xploader.sendMessage(
            m.chat,
            {
                text: textToSend,
                mentions: participants.map((a) => a.id),
            },
            {
                quoted: m,
            }
        );
    }
};