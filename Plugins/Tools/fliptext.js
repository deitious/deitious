// XPLOADER-BOT by Tylor

module.exports = {
  command: ['fliptext'],
  operate: async ({ m, args, prefix, command, reply }) => {
    if (args.length < 1) return reply(`*Example:\n${prefix}fliptext Tylor*`);
    
    let quere = args.join(" ");
    let flipe = quere.split("").reverse().join("");
    
    reply(`Normal:\n${quere}\nFlip:\n${flipe}`);
  }
};