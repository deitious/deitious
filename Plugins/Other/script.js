// XPLOADER-BOT by Tylor

const axios = require('axios');  // Import axios
const fs = require('fs');
const tylorkid5 = fs.readFileSync("./Media/Images/Xploader5.jpg") // Path to the image

module.exports = {
  command: ['script', 'sc', 'repository', 'repo'],
  operate: async ({ m, Xploader }) => {
    try {
      const me = m.sender;
      const response = await axios.get('https://api.github.com/repos/Dark-Xploit/XPLOADER--BOT');
      if (response.status === 200) {
        const repoData = response.data;
        const repos = `
*BOT NAME:*
> ${repoData.name}

*STARS:* 
> ${repoData.stargazers_count}

*FORKS:* 
> ${repoData.forks_count}

*GITHUB LINK:* 
https://github.com/Dark-Xploit/XPLOADER--BOT

@${me.split("@")[0]}👋, Don't forget to star and fork my repository😊

> 𝐗𝐩𝐥𝐨𝐚𝐝𝐞𝐫𝐁𝐨𝐭`;

        Xploader.sendMessage(m.chat, { text: repos, contextInfo: {
          mentionedJid: [m.sender],
          forwardingScore: 9999, 
          isForwarded: true, 
          forwardedNewsletterMessageInfo: {
            newsletterJid: '120363345633217147@newsletter',
            serverMessageId: 20,
            newsletterName: '❃᙭ᑭᒪOᗩᗪᗴᖇ ᗷOT'
          },
          externalAdReply: {
            title: "᙭ᑭᒪOᗩᗪᗴᖇ ᗷOT", 
            body: "",
            thumbnail: tylorkid5, 
            sourceUrl: null,
            mediaType: 1
          }
        }}, { quoted: m });
      } else {
        await m.reply(`Failed to fetch repository data!`);
      }
    } catch (error) {
      console.error(error);
      await m.reply(`Couldn't find repository!`);
    }
  }
};