const chatMessages = document.getElementById("chatMessages");
const userInput = document.getElementById("userInput");

const API_URL = "https://isteamo-project.onrender.com/chat";

let sessionId = sessionStorage.getItem("calmGardenSessionId");

if (!sessionId) {
  sessionId = crypto.randomUUID();
  sessionStorage.setItem("calmGardenSessionId", sessionId);
}

function addMessage(text, className){
  const message = document.createElement("div");
  message.className = "message " + className;
  message.textContent = text;
  chatMessages.appendChild(message);
  chatMessages.scrollTop = chatMessages.scrollHeight;
  return message;
}