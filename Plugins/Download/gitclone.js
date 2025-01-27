// XPLOADER-BOT by Tylor

const fetch = require('node-fetch'); 

module.exports = {
  command: ['gitclone'],
  operate: async ({ m, args, prefix, command, Xploader, reply, mess, isUrl }) => {
    if (!args[0])
      return reply(`*GitHub link to clone?*\nExample :\n${prefix}${command} https://github.com/Dark-Xploit/XPLOADER--BOT`);
    
    if (!isUrl(args[0]))
      return reply("*Link invalid! Please provide a valid URL.*");

    const regex1 = /(?:https|git)(?::\/\/|@)(www\.)?github\.com[\/:]([^\/:]+)\/(.+)/i;
    const [, , user, repo] = args[0].match(regex1) || [];
    
    if (!repo) {
      return reply("*Invalid GitHub link format. Please double-check the provided link.*");
    }
    
    const repoName = repo.replace(/.git$/, "");
    const url = `https://api.github.com/repos/${user}/${repoName}/zipball`;
    
    try {
      const response = await fetch(url, { method: "HEAD" });
      const filename = response.headers
        .get("content-disposition")
        .match(/attachment; filename=(.*)/)[1];
      
      await Xploader.sendMessage(
        m.chat,
        {
          document: { url: url },
          fileName: filename + ".zip",
          mimetype: "application/zip",
        },
        { quoted: m }
      );
    } catch (err) {
      console.error(err);
      reply(mess.error);
    }
  }
};