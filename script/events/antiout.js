module.exports.config = {
  name: "antiout",
  eventType: ["log:unsubscribe"],
  version: "1.0.0",
  credits: "DungUwu",
  description: "listen events",
  cooldowns: 5
};

module.exports.handleEvent = async ({ api, event }) => {
  if (event.logMessageData?.leftParticipantFbId === api.getCurrentUserID()) return;
  if (event.logMessageData?.leftParticipantFbId) {
    const info = await api.getUserInfo(event.logMessageData?.leftParticipantFbId);
    const { name } = info[event.logMessageData?.leftParticipantFbId];
    api.addUserToGroup(event.logMessageData?.leftParticipantFbId, event.threadID, (error) => {
      if (error) {
        api.sendMessage(`Unable to re-add member ${name} to the group!`, event.threadID);
      } else {
        api.sendMessage(`Active Antiout Mode Detected! ${name} Has been re-added to the group successfully!`, event.threadID);
      }
    });
  }
};
