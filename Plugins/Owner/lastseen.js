
module.exports = {
  command: ['lastseen'],
  operate: async ({ Cypher, m, reply, isCreator, mess, prefix, command, text, args }) => {
    if (!isCreator) return reply(mess.owner);
    if (!text) return reply(`Options: all/contacts/contact_blacklist/none\nExample: ${prefix + command} all`);

    const validOptions = ["all", "contacts", "contact_blacklist", "none"];
    if (!validOptions.includes(args[0])) return reply("Invalid option");

    await Cypher.updateLastSeenPrivacy(text);
    await reply(mess.done);
  }
};