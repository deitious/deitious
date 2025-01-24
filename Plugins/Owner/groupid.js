// XPLOADER-BOT 

module.exports = {
  command: ['groupid', 'idgc'],
  operate: async ({ Xploader, m, reply, isCreator, mess, args, q }) => {
    if (!isCreator) return reply(mess.owner);
    if (!q) return reply('Please provide a group link!');
    
    let linkRegex = args.join(" ");
    let coded = linkRegex.split("https://chat.whatsapp.com/")[1];
    if (!coded) return reply("Link Invalid");

    Xploader.query({
      tag: "iq",
      attrs: {
        type: "get",
        xmlns: "w:g2",
        to: "@g.us"
      },
      content: [{ tag: "invite", attrs: { code: coded } }]
    }).then(async (res) => {
      const tee = `${res.content[0].attrs.id ? res.content[0].attrs.id : "undefined"}`;
      reply(tee + '@g.us');
    });
  }
};