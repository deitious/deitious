
module.exports = {
  command: ['savestatus', 'save'],
  operate: async ({ m, saveStatusMessage }) => {
    await saveStatusMessage(m);
  }
};