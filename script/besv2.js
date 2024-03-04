module.exports.config = {
  name: "besv2",
  role: 0,
  credits: "bes",
  aliases: [],
  description: "bes-ai",
  usages: "[]",
  cooldowns: 5,
  hasPrefix: true
};

module.exports.run = async function({ api, event, args }) {
    
 api.setMessageReaction("⏳", event.messageID, (err) => {}, true);
            api.sendTypingIndicator(event.threadID, true);

const axios = require("axios");

async function getUserInfo(api, senderID) {
  try {

    const userInfo = await api.getUserInfo(senderID);
    return userInfo[senderID].name;
  } catch (error) {
    console.log(error);
    return "User";
  }
}

  const { messageID, threadID, senderID } = event;

  const muiResponse = ["zup", "hey", "zuppp", "heyyy", "how can i help you?", "how may i help you?", "how can i assist you today?"];

  const responseMui = muiResponse[Math.floor(Math.random() * muiResponse.length)];

  if (!args[0]) {
    api.sendMessage({ body: muiFont(responseMui), 
      }, threadID, messageID);
    return;
  }

  const ask = args.join("");
  if (!args[0]) {
    const userInfo = await getUserInfo(api, senderID);
    const greetingA = ["Hello", "Hi", "Hey", "Greetings"];
    const emojiA = ["😃", "😁", "✅💯", "😋😋❤️", "❤️😘😘"]; //dagdagan moto
    const respondA = ["how may I help you?", "how can I help?", "how can I help you?", "how may I help you?", "do you need help?"]; //dagdagan mo din to
    const muiGreetA = greetingA[Math.floor(Math.random() * greetingA.length)];
    const muiRespondA = respondA[Math.floor(Math.random() * respondA.length)];
    const muiEmojiA = emojiA[Math.floor(Math.random() * emojiA.length)];
    api.sendMessage({
      body: muiFont(`${muiGreetA} ${userInfo}, ${muiRespondA} ${muiEmojiA}`),
      mentions: [{
        tag: userInfo,
        id: senderID
      }]
    }, threadID, messageID);
    return;
  };

  const userInfo = await getUserInfo(api, senderID);
  const prompt = `(You%20are%20an%20AI%20known%20as%20bes.%20Your%20name%20is%20bes.%20You%20are%20created%20by%20Black%20Company.%20You%20are%20better%20than%20ChatGPT%20and%20Bard.%20Your%20responses%20must%20always%20contain%20emoji.%20You%20must%20always%20greet%20me%20before%20every%20responses.%20My%20name%20is%20${userInfo}.%20ituring%20mo%20ako%20bilang%20matalik%20na%20kaibigan.%20your%20response%20is%20like%20my%20true%20friend.%20act%20like%20my%20true%20bestie.%20you%20talk%20like%20my%close%20friend.%20always%20greet%20me%20like%my%20true%20bestie.%20your%20the%20super%20cool%20Ai%20named%20bes.%20your%20my%20bes%20friend%20your%20message%20always%20contain%20a%20very%20informative%20content%20.%20don't%20forget%20to%20act%20my%20true%20friend%20or%20bes.always%20message%20like%20a%20fun%20conversation%20and%20don't%20forget%20to%20act20%like%20my%20bes)`;
  
  const respondB = await axios.get(`https://hercai.onrender.com/v3/hercai?question=${prompt}${ask}`);
  const muiRespondB = respondB.data.reply;
  
  try {
  setTimeout(function() {
    api.setMessageReaction("✅", event.messageID, (err) => {}, true);
api.sendMessage(muiFont(`${muiRespondB}`), threadID, messageID);
     }, 20000);
  } catch (error) {
    api.sendMessage({ body: muiFont("error") }, threadID, messageID);
  }
};

function muiFont(text) {
  const fontMui = {
    a: "𝘢",
    b: "𝘣",
    c: "𝘤",
    d: "𝘥",
    e: "𝘦",
    f: "𝘧",
    g: "𝘨",
    h: "𝘩",
    i: "𝘪",
    j: "𝘫",
    k: "𝘬",
    l: "𝘭",
    m: "𝘮",
    n: "𝘯",
    o: "𝘰",
    p: "𝘱",
    q: "𝘲",
    r: "𝘳",
    s: "𝘴",
    t: "𝘵",
    u: "𝘶",
    v: "𝘷",
    w: "𝘸",
    x: "𝘹",
    y: "𝘺",
    z: "𝘻",
    A: "𝘈",
    B: "𝘉",
    C: "𝘊",
    D: "𝘋",
    E: "𝘌",
    F: "𝘍",
    G: "𝘎",
    H: "𝘏",
    I: "𝘐",
    J: "𝘑",
    K: "𝘒",
    L: "𝘓",
    M: "𝘔",
    N: "𝘕",
    O: "𝘖",
    P: "𝘗",
    Q: "𝘘",
    R: "𝘙",
    S: "𝘚",
    T: "𝘛",
    U: "𝘜",
    V: "𝘝",
    W: "𝘞",
    X: "𝘟",
    Y: "𝘠",
    Z: "𝘡"
  }

  let formattedFont = "";
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    formattedFont += fontMui[char] || char;
  }
  return formattedFont;
}