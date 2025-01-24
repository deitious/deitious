module.exports = {
  command: ["gradienttext"],
  operate: async ({ m, args, reply, Xploader, prefix, mess, ephoto }) => {
    let q = args.join(" ");
    if (!q) {
      return reply(`*Example: ${prefix}gradienttext Tylor*`);
    }

    const link = "https://en.ephoto360.com/create-3d-gradient-text-effect-online-600.html";

    try {
      let result = await ephoto(link, q);
      await Xploader.sendMessage(
        m.chat,
        { image: { url: result }, caption: `${mess.success}` },
        { quoted: m }
      );
    } catch (error) {
      console.error("Error in gradienttext command:", error);
      reply("*An error occurred while generating the effect.*");
    }
  },
};