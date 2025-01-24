// XPLOADER-BOT 

module.exports = {
  command: ['online'],
  operate: async ({ Xploader, m, reply, isCreator, mess, prefix, command, text, args }) => {
    if (!isCreator) return reply(mess.owner);
    if (!text) return reply(`Options: all/match_last_seen\nExample: ${prefix + command} all`);

    const validOptions = ["all", "match_last_seen"];
    if (!validOptions.includes(args[0])) return reply("Invalid option");

    await Xploader.updateOnlinePrivacy(text);
    await reply(mess.done);
  }
};