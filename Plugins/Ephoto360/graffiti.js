module.exports = {
  command: ["graffiti"],
  operate: async ({ m, args, reply, Xploader, prefix, mess, ephoto }) => {
    let q = args.join(" ");
    if (!q) {
      return reply(`*Example: ${prefix}graffiti Tylor*`);
    }

    const link = "https://en.ephoto360.com/cute-girl-painting-graffiti-text-effect-667.html";

    try {
      let result = await ephoto(link, q);
      await Xploader.sendMessage(
        m.chat,
        { image: { url: result }, caption: `${mess.success}` },
        { quoted: m }
      );
    } catch (error) {
      console.error("Error in graffiti command:", error);
      reply("*An error occurred while generating the effect.*");
    }
  },
};