
module.exports = {
  command: ['autoread'],
  operate: async ({ Cypher, m, reply, args, prefix, command, isCreator, mess, db, botNumber }) => {
    if (!isCreator) return reply(mess.owner);
    if (args.length < 1) return reply(`Example: ${prefix + command} on/off`);

    const validOptions = ["on", "off"];
    const option = args[0].toLowerCase();

    if (!validOptions.includes(option)) return reply("Invalid option");

    db.data.settings[botNumber].autoread = option === "on";
    reply(`Auto-read ${option === "on" ? "enabled" : "disabled"} successfully`);
  }
};