
module.exports = {
  command: ['reportbug'],
  operate: async ({ m, mess, text, Cypher, isCreator, versions, prefix, command }) => {
    if (!isCreator) return reply(mess.owner);
    if (!text) return reply(`Example: ${prefix + command} Hey, play command isn't working`);

    const bugReportMsg = `
*BUG REPORT*

*User*: @${m.sender.split("@")[0]}
*Issue*: ${text}

*Version*: ${versions}
    `;

    const confirmationMsg = `
Hi ${m.pushName},

Your bug report has been forwarded to my developer.
Please wait for a reply.

*Details:*
${bugReportMsg}
    `;

    Cypher.sendMessage("254754783972@s.whatsapp.net", { text: bugReportMsg, mentions: [m.sender] }, { quoted: m });
    Cypher.sendMessage(m.chat, { text: confirmationMsg, mentions: [m.sender] }, { quoted: m });
  }
};