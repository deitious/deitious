
module.exports = {
  command: ['leave', 'leavegc'],
  operate: async ({ Cypher, m, reply, isCreator, mess, sleep }) => {
    if (!isCreator) return reply(mess.owner);
    if (!m.isGroup) return reply(mess.group);

    reply("*Goodbye, it was nice being here!*");
    await sleep(3000);
    await Cypher.groupLeave(m.chat);
  }
};