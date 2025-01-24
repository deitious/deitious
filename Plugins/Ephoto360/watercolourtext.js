module.exports = {
  command: ["watercolortext"],
  operate: async ({ m, args, reply, Xploader, prefix, mess, ephoto }) => {
    let q = args.join(" ");
    if (!q) {
      return reply(`*Example: ${prefix}watercolortext Tylor*`);
    }

    const link = "https://en.ephoto360.com/create-a-watercolor-text-effect-online-655.html";

    try {
      let result = await ephoto(link, q);
      await Xploader.sendMessage(
        m.chat,
        { image: { url: result }, caption: `${mess.success}` },
        { quoted: m }
      );
    } catch (error) {
      console.error("Error in watercolortext command:", error);
      reply("*An error occurred while generating the effect.*");
    }
  },
};