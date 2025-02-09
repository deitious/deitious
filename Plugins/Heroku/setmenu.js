
module.exports = {
    command: ['setmenu'],
    operate: async (context) => {
        const { m, mess, text, reply, isCreator, setHerokuEnvVar } = context;
        if (!isCreator) return reply(mess.owner);
        if (!text) return reply('*Please specify the menu style*\n\nExample: .setmenu 2');

        const menuStyleValue = text.trim();
        try {
            await setHerokuEnvVar("MENU_STYLE", menuStyleValue);
            await reply(`*Menu style updated successfully*\n\`\`\`MENU_STYLE = ${menuStyleValue}\`\`\``);
            await reply(`*Bot will restart to apply the new setting. Please wait a moment!*`);
        } catch (error) {
            await reply(`*Error updating menu style*\n${error.message}`);
        }
    }
};