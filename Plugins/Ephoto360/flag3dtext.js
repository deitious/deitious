module.exports = {
  command: ["flag3dtext"],
  operate: async ({ m, args, reply, Xploader, prefix, mess, ephoto }) => {
    let q = args.join(" ");
    if (!q) {
      return reply(`*Example: ${prefix}flag3dtext Tylor*`);
    }

    const link = "https://en.ephoto360.com/free-online-american-flag-3d-text-effect-generator-725.html";

    try {
      let result = await ephoto(link, q);
      await Xploader.sendMessage(
        m.chat,
        { image: { url: result }, caption: `${mess.success}` },
        { quoted: m }
      );
    } catch (error) {
      console.error("Error in flag3dtext command:", error);
      reply("*An error occurred while generating the effect.*");
    }
  },
};