const { NlpManager } = require("node-nlp");
const { JSDOM } = require("jsdom");
const axios = require("axios");
const manager = new NlpManager({ languages: ["en"], forceNER: true });

manager.addDocument(
  "en",
  "What is the weather like in Paris?",
  "weather.inquiry"
);
manager.addDocument(
  "en",
  "Tell me the weather forecast for New York",
  "weather.inquiry"
);
manager.addDocument("en", "mackBook ", "amazone.inquiry");
manager.addDocument("en", "redmi ", "amazone.inquiry");
manager.addDocument(
  "en",
  "i need product details from amazone? ",
  "amazoneQuery.inquiry"
);
manager.addDocument(
  "en",
  "need to know a product details in amazone? ",
  "amazoneQuery.inquiry"
);
manager.addDocument("en", "which type of bot are you ?", "bot.inquiry");
manager.addDocument("en", "which type of bot are you ?", "bot.inquiry");  
manager.addDocument("en", "who is your inventor ?", "inventor.inquiry");
manager.addDocument("en", "who is dilshad ?", "dilshad.inquiry");
manager.addDocument("en", "who was invented you ?", "inventor.inquiry");
manager.addDocument("en", "hey ", "greetings.inquiry");
manager.addDocument("en", "heyy ", "greetings.inquiry");
manager.addDocument("en", "hello", "greetings.inquiry");
manager.addDocument("en", "helloooo", "greetings.inquiry");
manager.addDocument("en", "heloooo", "greetings.inquiry");
manager.addDocument("en", "hellooo", "greetings.inquiry");
manager.addDocument("en", "hi there", "greetings.inquiry");
manager.addDocument("en", "hai", "greetings.inquiry");
manager.addDocument("en", "how are you?", "ask.inquiry");
manager.addDocument("en", "how do you do ?", "ask.inquiry");
manager.addDocument("en", "what is your name ?", "name.inquiry");
manager.addDocument("en", "who are you ?", "name.inquiry");
manager.addDocument("en", "do you have any knowledge?", "knowledge.inquiry");
manager.addDocument("en", "what about your knowledge?", "knowledge.inquiry");
manager.addDocument("en", "name please", "name.inquiry");
manager.addDocument("en", "ok ", "ok.inquiry");
manager.addDocument("en", "yes ", "yes.inquiry");
manager.addDocument("en", "dilshad have any projects ? ", "dilshadProject.inquiry");
manager.addDocument("en", "how old are dilshad? ", "dilshadAge.inquiry");

manager.addAnswer("en", "amazone.inquiry", "searching..........");
manager.addAnswer("en", "knowledge.inquiry", "actually iam started my first walk let me see the world hah ? ");
// manager.addAnswer("en", "ask.inquiry", "iam fine... do you need any help ? ");
manager.addAnswer("en", "dilshadAge.inquiry", "i dont know exactly may be around 19 ");
manager.addAnswer("en", "dilshadProject.inquiry", "you can refer his github profile https://github.com/dilshadanikkadan");
manager.addAnswer("en", "weather.inquiry", "I am not a weather bot, sorry!");
manager.addAnswer("en", "amazoneQuery.inquiry", "which product do  you need ?");
manager.addAnswer("en", "ok.inquiry", "You need any other help?!");
manager.addAnswer("en", "yes.inquiry", "tell me iam listening...!");
manager.addAnswer("en", "yeah.inquiry", "tell me iam listening...!");
manager.addAnswer("en", "name.inquiry", "My name is D-Bot!");
manager.addAnswer("en", "greetings.inquiry", "Hi there! How can I help you?");
manager.addAnswer("en", "bot.inquiry", "iam a service bot ,but iam new to the word !!?");
manager.addAnswer(
  "en",
  "inventor.inquiry",
  "I was devolped by dilshad"
);

async function trainModel() {
  await manager.train();
  manager.save();
}

async function processInput(text) {
  const response = await manager.process("en", text);
  console.log(response.intent);
  if (response.intent === "dilshad.inquiry") {
    const serachAmazone = await axios.get(
      "https://portfolio-jet-eight-84.vercel.app/"
    );

    const html = serachAmazone.data;
    const dom = new JSDOM(html); 
    const document = dom.window.document;
    const readData = document.querySelector(".info span")?.textContent;
    const _finalData = readData?.replace("I am ", "he is ");
    return { answer: _finalData };
  }
  return response.answers.length === 0 ? null : response.answers[0];
}

module.exports = { trainModel, processInput };
