module.exports.config = {
  name: "out",
  version: "1.0.0",
  role: 1,
  credits: "Kanichi",
  aliases: [],
  description: "automatically removed from the group.",
  usages: "[]",
  cooldowns: 5,
  hasPrefix: true
};

module.exports.run = async function({ api, event, args }) {
  if (!args[0]) return api.removeUserFromGroup(api.getCurrentUserID(), event.threadID);
  if (!isNaN(args[0])) return api.removeUserFromGroup(api.getCurrentUserID(), args.join(" "));
};