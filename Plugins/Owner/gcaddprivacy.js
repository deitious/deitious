// XPLOADER-BOT 

module.exports = {
  command: ['gcaddprivacy'],
  operate: async ({ Xploader, m, reply, isCreator, mess, prefix, command, text, args }) => {
    if (!isCreator) return reply(mess.owner);
    if (!text) return reply(`Options: all/contacts/contact_blacklist/none\nExample: ${prefix + command} all`);

    const validOptions = ["all", "contacts", "contact_blacklist"];
    if (!validOptions.includes(args[0])) return reply("*Invalid option!*");

    await Xploader.updateGroupsAddPrivacy(text);
    await reply(mess.done);
  }
};