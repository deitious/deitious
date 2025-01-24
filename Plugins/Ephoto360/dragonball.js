module.exports = {
  command: ["dragonball"],
  operate: async ({ m, args, reply, Xploader, prefix, mess, ephoto }) => {
    let q = args.join(" ");
    if (!q) {
      return reply(`*Example: ${prefix}dragonball Tylor*`);
    }

    const link = "https://en.ephoto360.com/create-dragon-ball-style-text-effects-online-809.html";

    try {
      let result = await ephoto(link, q);
      await Xploader.sendMessage(
        m.chat,
        { image: { url: result }, caption: `${mess.success}` },
        { quoted: m }
      );
    } catch (error) {
      console.error("Error in dragonball command:", error);
      reply("*An error occurred while generating the effect.*");
    }
  },
};