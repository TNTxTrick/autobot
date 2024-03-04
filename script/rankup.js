module.exports.config = {
  name: 'rankup',
  version: '1.0.0',
  role: 0,
  aliases: [],
  description: 'rankup',
  usages: 'rankup',
  credits: 'Developer',
  cooldowns: 5,
  hasPrefix: true
};

module.exports.run = async function ({ api, event, experience }) {
  
  try {
      
  let handleRankup = [];

  if (handleRankup[event.threadID] === 0) {
    return;
    }  

     const { levelInfo,  levelUp } = experience;
    
    const rank = await levelInfo(event?.senderID);
    
    if (!rank || typeof rank !== 'object') {
        return;
    }

    const { name, exp, level } = rank;

    if (exp % (10 * Math.pow(2, level - 1)) === 0) {

            await levelUp(event?.senderID);
      
            api.sendMessage(`Congratulations ${name}! You have reached level ${level + 1}.`, event.threadID);
        
    }

    } catch (error) {
      console.log(error);
  }
};

module.exports.run = async function ({ api, event, args, prefix, experience }) {
    
  try {

    const startRankup = [];
    const input = args.join(" ");

    if (!input) {
      api.sendMessage(`Invalid command! \n\nUsages: ${prefix}rankup [on/off] || [info]`, event.threadID, event.messageID);
      return;
    }
    const { levelInfo } = experience;
      
    const rank = await levelInfo(event?.senderID);

    if (!rank || typeof rank !== 'object') {
      return;
    }

    const { name, exp, level } = rank;

    switch(input) {
      case 'on':
        startRankup[event.threadID] = true;
        api.sendMessage('Rankup notification is now enabled for this chat.', event.threadID, event.messageID);
        break;
      case 'off':
        startRankup[event.threadID] = false;
        api.sendMessage('Rankup notification is now disabled for this chat.', event.threadID, event.messageID);
        break;
      case 'info':
        api.sendMessage(`Hello! ${name}, your current level is ${level} with ${exp} experience points. To advance to the next level, you need ${10 * Math.pow(2, level) - exp} more experience points.`, event.threadID, event.messageID);
        break;
      case 'status':
        api.sendMessage(`Rankup notification is currently ${startRankup[event.threadID] ? 'enabled' : 'disabled'} for this chat.`, event.threadID, event.messageID);
        break;
      default:
        api.sendMessage(`Invalid command usages. \n\nUsages: ${prefix}rankup [on/off] || [info]`, event.threadID, event.messageID);
    }

  } catch (error) {
    console.log(error);
    }
};
