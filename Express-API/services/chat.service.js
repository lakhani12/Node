const { GoogleGenAI } = require("@google/genai");

// rule base bot --> Static Reply
const getStaticReply = (message) => {
  const text = message.toLowerCase();

  if (text.includes("hi") || text.includes("hello") || text.includes("hey")) {
    return "Hello! How can I help you today?";
  }

  if (text.includes("name")) {
    return "I am your virtual assistant. You can call me ChatBot.";
  }

  if (text.includes("help") || text.includes("support")) {
    return "Sure! I can help you with orders, payments, and general questions.";
  }

  if (text.includes("order") || text.includes("track")) {
    return "Please provide your order ID so I can check the status.";
  }

  if (text.includes("payment") || text.includes("refund")) {
    return "I can help you with payment or refund issues. Please share details.";
  }

  if (text.includes("bye") || text.includes("goodbye")) {
    return "Goodbye! Have a great day 😊";
  }

  return "I didn't understand that.";
};

// Ai Chat Bot --> Dynamic Reply
const getAiReply = async (message) => {
    const ai = new GoogleGenAI(process.env.GOOGLE_API_KEY);
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: message,
  });
  return response.text;
};

module.exports.getReply = async (message) => {
  try {
    return getAiReply(message);
    // return getStaticReply(message);
  } catch (error) {
    console.log(error)
    return getStaticReply(message);
  }
};
