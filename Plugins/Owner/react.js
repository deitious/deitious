
module.exports = {
  command: ['react'],
  operate: async ({ Cypher, m, reply, isCreator, mess, args, quoted }) => {
    if (!isCreator) return reply(mess.owner);
    if (!args) return reply(`*Reaction emoji needed*\n Example .react 🤔`);

    const reactionMessage = {
      react: {
        text: args[0],
        key: { remoteJid: m.chat, fromMe: true, id: quoted.id },
      },
    };
    Cypher.sendMessage(m.chat, reactionMessage);
  }
};