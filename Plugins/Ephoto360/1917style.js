module.exports = {
  command: ["1917style"],
  operate: async ({ m, args, reply, Xploader, prefix, mess, ephoto }) => {
    let q = args.join(" ");
    if (!q) {
      return reply(`*Example: ${prefix}1917style Tylor*`);
    }

    const link = "https://en.ephoto360.com/1917-style-text-effect-523.html";

    try {
      let result = await ephoto(link, q);
      await Xploader.sendMessage(
        m.chat,
        { image: { url: result }, caption: `${mess.success}` },
        { quoted: m }
      );
    } catch (error) {
      console.error("Error in 1917style command:", error);
      reply("*An error occurred while generating the effect.*");
    }
  },
};