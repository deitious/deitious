// XPLOADER-BOT by Tylor

const fs = require('fs');  // Import fs
const { sleep } = require('../../lib/myfunc'); // Import sleep function

module.exports = {
  command: ['vcf'],
  operate: async ({ Xploader, m, reply, mess, participants, isGroupAdmins, isCreator, groupMetadata }) => {
    if (!m.isGroup) return reply(mess.group);
    if (!(isGroupAdmins || isCreator)) return reply(mess.admin);

    let cmiggc = await Xploader.groupMetadata(m.chat);
    let vcard = "";
    let noPort = 0;
    for (let a of cmiggc.participants) {
      vcard += `BEGIN:VCARD\nVERSION:3.0\nFN:[${noPort++}] +${a.id.split("@")[0]}\nTEL;type=CELL;type=VOICE;waid=${a.id.split("@")[0]}:+${a.id.split("@")[0]}\nEND:VCARD\n`;
    }
    let nmfilect = "./contacts.vcf";
    reply(`\nPlease wait, saving ${cmiggc.participants.length} contacts`);

    fs.writeFileSync(nmfilect, vcard.trim());
    await sleep(2000);
    Xploader.sendMessage(
      m.chat,
      {
        document: fs.readFileSync(nmfilect),
        mimetype: "text/vcard",
        fileName: "Contact.vcf",
        caption: `Successful\n\nGroup: *${cmiggc.subject}*\nContacts: *${cmiggc.participants.length}*`,
      },
      { ephemeralExpiration: 86400, quoted: m }
    );
    fs.unlinkSync(nmfilect);
  }
};