
module.exports = {
    command: ['poll'],
    operate: async (context) => {
        const { m, mess, text, isCreator, prefix, Cypher, isGroup } = context;
        if (!isCreator) return reply(mess.owner);
        if (!m.isGroup) return reply(mess.group);
        let [poll, opt] = text.split("|");
        if (text.split("|") < 2)
            return await reply(
                `Enter a question and at least 2 options\nExample: ${prefix}poll Who is best player?|Messi,Ronaldo,None...`
            );
        let options = [];
        for (let i of opt.split(",")) {
            options.push(i);
        }
        
        await Cypher.sendMessage(m.chat, {
            poll: {
                name: poll,
                values: options,
            },
        });
    }
};