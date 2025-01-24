// XPLOADER-BOT by Tylor

module.exports = {
    command: ['setmenu'],
    operate: async (context) => {
        const { m, mess, text, isCreator, setHerokuEnvVar } = context;
        if (!isCreator) return m.reply(mess.owner);
        if (!text) return m.reply('*Please specify the menu style*\n\nExample: .setmenu 2');

        const menuStyleValue = text.trim();
        try {
            await setHerokuEnvVar("MENU_STYLE", menuStyleValue);
            await m.reply(`*Menu style updated successfully*\n\`\`\`MENU_STYLE = ${menuStyleValue}\`\`\``);
            await m.reply(`*Bot will restart to apply the new setting. Please wait a moment!*`);
        } catch (error) {
            await m.reply(`*Error updating menu style*\n${error.message}`);
        }
    }
};