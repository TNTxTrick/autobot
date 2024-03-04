module.exports.config = {
  name: "kickall",
  version: "1.0.0",
  role: 1,
  credits: "Khánh Milo",
  aliases: [],
  description: "automatically kick out user from the group.",
  usages: "[]",
  cooldowns: 5,
  hasPrefix: true
};

module.exports.run = async function({ api, event, args }) {
  var threadInfo = await api.getThreadInfo(event.threadID)
  var id = threadInfo.participantIDs
  const user = args.join(" ")
  function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  };
  for (let user of id) {
    await delay(5000)
    api.removeUserFromGroup(user, event.threadID, user);
  }
};