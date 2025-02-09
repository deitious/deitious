
const { promisify } = require('util');
const { exec } = require('child_process');
const execAsync = promisify(exec);

module.exports = {
  command: ['disk'],
  operate: async ({ Cypher, m, reply, isCreator, mess }) => {
    if (!isCreator) return reply(mess.owner);

    await reply('Please Wait');
    
    let o;
    try {
      o = await execAsync('cd && du -h --max-depth=1');
    } catch (e) {
      o = e;
    } finally {
      let { stdout, stderr } = o;
      if (stdout.trim()) reply(stdout);
      if (stderr.trim()) reply(stderr);
    }
  }
};