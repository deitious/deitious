module.exports = {
  command: ["galaxywallpaper"],
  operate: async ({ m, args, reply, Xploader, prefix, mess, ephoto }) => {
    let q = args.join(" ");
    if (!q) {
      return reply(`*Example: ${prefix}galaxywallpaper Tylor*`);
    }

    const link = "https://en.ephoto360.com/create-galaxy-wallpaper-mobile-online-528.html";

    try {
      let result = await ephoto(link, q);
      await Xploader.sendMessage(
        m.chat,
        { image: { url: result }, caption: `${mess.success}` },
        { quoted: m }
      );
    } catch (error) {
      console.error("Error in galaxywallpaper command:", error);
      reply("*An error occurred while generating the effect.*");
    }
  },
};