// XPLOADER-BOT 

module.exports = {
  command: ['readreceipts'],
  operate: async ({ Xploader, m, reply, isCreator, mess, prefix, command, text, args }) => {
    if (!isCreator) return reply(mess.owner);
    if (!text) return reply(`Options: all/none\nExample: ${prefix + command} all`);

    const validOptions = ["all", "none"];
    if (!validOptions.includes(args[0])) return reply("Invalid option");

    await Xploader.updateReadReceiptsPrivacy(text);
    await reply(mess.done);
  }
};