module.exports = {
  command: ["incandescent"],
  operate: async ({ m, args, reply, Xploader, prefix, mess, ephoto }) => {
    let q = args.join(" ");
    if (!q) {
      return reply(`*Example: ${prefix}incandescent Tylor*`);
    }

    const link = "https://en.ephoto360.com/text-effects-incandescent-bulbs-219.html";

    try {
      let result = await ephoto(link, q);
      await Xploader.sendMessage(
        m.chat,
        { image: { url: result }, caption: `${mess.success}` },
        { quoted: m }
      );
    } catch (error) {
      console.error("Error in incandescent command:", error);
      reply("*An error occurred while generating the effect.*");
    }
  },
};