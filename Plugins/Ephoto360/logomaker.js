module.exports = {
  command: ["logomaker"],
  operate: async ({ m, args, reply, Xploader, prefix, mess, ephoto }) => {
    let q = args.join(" ");
    if (!q) {
      return reply(`*Example: ${prefix}logomaker Tylor*`);
    }

    const link = "https://en.ephoto360.com/free-bear-logo-maker-online-673.html";

    try {
      let result = await ephoto(link, q);
      await Xploader.sendMessage(
        m.chat,
        { image: { url: result }, caption: `${mess.success}` },
        { quoted: m }
      );
    } catch (error) {
      console.error("Error in logomaker command:", error);
      reply("*An error occurred while generating the effect.*");
    }
  },
};