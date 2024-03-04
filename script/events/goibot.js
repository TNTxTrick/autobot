module.exports.config = {
  name: "goibot",
  eventType: ["log:unsubscribe"],
  version: "1.0.0",
  credits: "manHIT",
  description: "listen events",
  cooldowns: 5
};

module.exports.handleEvent = async function ({ api, event, Users }) {

  /*const tl = [
    "ano???",
    "chat muna ako uwuuu.",
    "andito nag tatampuuu???",
    "bla-blah.",
    "umuwi kana bby.",
    "ugh yamate kudasaiii"
  ];

   const rand = tl[Math.floor(Math.random() * tl.length)];

   const aa = event.body ? event.body.toLowerCase() : "";

  if (aa.indexOf("bot") === 0) {
    api.setMessageReaction("💗", event.messageID, (err) => {}, true);
    api.sendTypingIndicator(event.threadID, true);

    const senderID = event.senderID;
    const userName = await api.getUserInfo(senderID);
    const userInfo = userName[senderID].name;

    const msg = {
      body: "@" + userInfo + ", " + rand,
      mentions: [
        {
          tag: "@" + userInfo,
          id: senderID,
        },
      ],
    };

    setTimeout(function () {
      return api.sendMessage(msg, threadID, messageID);
    }, 5000);
  }

  const lt = [
    "ang bait mo naman sana kunin kana ni lord.",
    "bawal mag mura ah.",
    "kulit mo eh nuh???",
    "minus x100000000000000000000 ka sa langit.",
    "walang kang respetu.",
    "ang sama mo"
  ];

   const dnar = lt[Math.floor(Math.random() * lt.length)];

  const bb = event.body ? event.body.toLowerCase() : "";

  if (bb.indexOf("tangina") === 0) {
    api.setMessageReaction("😠", event.messageID, (err) => {}, true);
    api.sendTypingIndicator(event.threadID, true);

    const senderID = event.senderID;
    const userName = await api.getUserInfo(senderID);
    const userInfo = userName[senderID].name;

    const msg = {
      body: "@" + userInfo + ", " + dnar,
      mentions: [
        {
          tag: "@" + userInfo,
          id: senderID
        },
      ],
    };

    setTimeout(function () {
      return api.sendMessage(msg, threadID, messageID);
    }, 5000);
  }

  const bundas = [ 
            
            "ano???",
            "ano kailangan mo.",
            "ang ingay mo",
            "kulit mo eh nuh",
            "landian tayu ito link: https://facebook.com/100037363620456."
            
           ];
  
  const andrian = bundas[Math.floor(Math.random() * bundas.length)]

  const cc = event.body ? event.body.toLowerCase() : '';

  if (cc.indexOf("bundas") === 0) {
  
    api.setMessageReaction("💗", event.messageID, (err) => {}, true)
    api.sendTypingIndicator(event.threadID, true);
    
    const senderID = event.senderID;
    const userName = await api.getUserInfo(senderID);
    const userInfo = userName[senderID].name;

    const msg = {
      body: "@" + userInfo + ", " + andrian, 
      mentions: [{
          tag: "@" + userInfo,
          id: senderID
        }]
    }
     setTimeout(function() {
    return api.sendMessage(msg, threadID, messageID);
    }, 5000);
  }*/
    
  const { threadID, messageID } = event;
    
  const aa = event.body ? event.body.toLowerCase() : "";

  if (
    aa.includes("sana all") ||
    aa.includes("sanaall") ||
    aa.includes("sana ol") ||
    aa.includes("sanaol") ||
    aa.includes("naol")) {

    const senderID = event.senderID;
    const userName = await api.getUserInfo(senderID);
    const userInfo = userName[senderID].name;
    
    const msg = {
      body: "@" + userInfo + ", " + "(2).", 
      mentions: [{
          tag: "@" + userInfo,
          id: senderID
        }]
    }
    
      setTimeout(function() {
    return api.sendMessage(msg, threadID, messageID);
      }, 5000);
    api.sendTypingIndicator(event.threadID, true);
      
  api.setMessageReaction("💗", event.messageID, (err) => {}, true);
  }

  if (
    aa.includes("haha") ||
    aa.includes("lmao") ||
    aa.includes("lol") ||
    aa.includes("yahoo") ||
    aa.includes("yahuu") ||
    aa.includes("agoy") ||
    aa.includes("aguy") ||
    aa.includes("😄") ||
    aa.includes("🤣") ||
    aa.includes("😂") ||
    aa.includes("😆") ||
    aa.includes("😄") ||
    aa.includes("😅") ||
    aa.includes("xd")) {
    return api.setMessageReaction("😆", event.messageID, (err) => {}, true);
  }

  if (
    aa.includes("wow") ||
    aa.includes("wowers")) {
    return api.setMessageReaction("😮", event.messageID, (err) => {}, true);
  }

  if (
    aa.includes("kawawa") ||
    aa.includes("sad") ||
    aa.includes("agoi") ||
    aa.includes("sakit") ||
    aa.includes("skit") ||
    aa.includes("pain") ||
    aa.includes("pighati")) {
    return api.setMessageReaction("🥲", event.messageID, (err) => {}, true);
  }
};