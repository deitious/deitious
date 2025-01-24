// XPLOADER BOT by Tylor

const moment = require('moment-timezone');

module.exports = {
  command: ['wanumber'],
  operate: async ({ Xploader, m, reply, text, prefix, command }) => {
    if (!text) {
      return reply(`*Provide Number with last values as x*\n\nExample: ${prefix + command} 2547961801xx`);
    }

    var inputnumber = text.split(" ")[0];
    reply(`*Searching for WhatsApp account in given range...*`);

    function countInstances(string, word) {
      return string.split(word).length - 1;
    }

    var number0 = inputnumber.split("x")[0];
    var number1 = inputnumber.split("x")[countInstances(inputnumber, "x")] ? inputnumber.split("x")[countInstances(inputnumber, "x")] : "";
    var random_length = countInstances(inputnumber, "x");
    var randomxx;

    if (random_length == 1) {
      randomxx = 10;
    } else if (random_length == 2) {
      randomxx = 100;
    } else if (random_length == 3) {
      randomxx = 1000;
    }

    var text66 = `*==[ List of Whatsapp Numbers ]==*\n\n`;
    var nobio = `\n*Bio:* || \nHey there! I am using WhatsApp.\n`;
    var nowhatsapp = `\n*Numbers with no WhatsApp account within provided range.*\n`;

    for (let i = 0; i < randomxx; i++) {
      var anu = await Xploader.onWhatsApp(`${number0}${i}${number1}@s.whatsapp.net`);
      var anuu = anu.length !== 0 ? anu : false;

      try {
        var anu1;
        try {
          anu1 = await Xploader.fetchStatus(anu[0].jid);
        } catch {
          anu1 = { status: '401', setAt: '' };
        }

        if (anu1.status === '401' || anu1.status.length === 0) {
          nobio += `wa.me/${anu[0].jid.split("@")[0]}\n`;
        } else {
          text66 += `*Number:* wa.me/${anu[0].jid.split("@")[0]}\n*Bio:* ${anu1.status}\n*Last updated:* ${moment(anu1.setAt).tz(global.timezones).format("HH:mm:ss DD/MM/YYYY")}\n\n`;
        }
      } catch {
        nowhatsapp += `${number0}${i}${number1}\n`;
      }
    }
    reply(`${text66}${nobio}${nowhatsapp}`);
  }
};