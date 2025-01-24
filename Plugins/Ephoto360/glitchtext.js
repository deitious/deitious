module.exports = {
  command: ["glitchtext"],
  operate: async ({ m, args, reply, Xploader, prefix, mess, ephoto }) => {
    let q = args.join(" ");
    if (!q) {
      return reply(`*Example: ${prefix}glitchtext Tylor*`);
    }

    const link = "https://en.ephoto360.com/create-digital-glitch-text-effects-online-767.html";

    try {
      let result = await ephoto(link, q);
      await Xploader.sendMessage(
        m.chat,
        { image: { url: result }, caption: `${mess.success}` },
        { quoted: m }
      );
    } catch (error) {
      console.error("Error in glitchtext command:", error);
      reply("*An error occurred while generating the effect.*");
    }
  },
};