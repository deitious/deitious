// XPLOADER-BOT 

module.exports = {
  command: ['join'],
  operate: async ({ Xploader, m, reply, isCreator, mess, args, text, isUrl }) => {
    if (!isCreator) return reply(mess.owner);
    if (!text) return reply("Enter group link");
    if (!isUrl(args[0]) && !args[0].includes("whatsapp.com")) return reply("Invalid link");

    try {
      const link = args[0].split("https://chat.whatsapp.com/")[1];
      await Xploader.groupAcceptInvite(link);
      reply("Joined successfully");
    } catch {
      reply("Failed to join group");
    }
  }
};