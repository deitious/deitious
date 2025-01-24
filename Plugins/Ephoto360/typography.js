module.exports = {
  command: ["typography"],
  operate: async ({ m, args, reply, Xploader, prefix, mess, ephoto }) => {
    let q = args.join(" ");
    if (!q) {
      return reply(`*Example: ${prefix}typography Tylor*`);
    }

    const link = "https://en.ephoto360.com/create-typography-text-effect-on-pavement-online-774.html";

    try {
      let result = await ephoto(link, q);
      await Xploader.sendMessage(
        m.chat,
        { image: { url: result }, caption: `${mess.success}` },
        { quoted: m }
      );
    } catch (error) {
      console.error("Error in typography command:", error);
      reply("*An error occurred while generating the effect.*");
    }
  },
};