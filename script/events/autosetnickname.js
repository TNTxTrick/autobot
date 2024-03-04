module.exports.config = {
  name: "autosetnickname",
  eventType: ["log:subscribe"],
  version: "1.0.0",
  credits: "@itsunknown",
  description: "listen events",
  cooldowns: 5
};

module.exports.handleEvent = async function({ api, event, prefix }) {
    
    const userID = api.getCurrentUserID;
    
    if (event.logMessageData?.addedParticipants && (event.logMessageData?.addedParticipants) && event.logMessageData?.addedParticipants.some(i => i.userFbId == userID)) {

  api.changeNickname(`[ ${prefix} ] • xyz`, event.threadID, userID);
       
    }
    
};