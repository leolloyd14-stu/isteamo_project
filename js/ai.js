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

function usePrompt(promptText){
  userInput.value = promptText;
  sendMessage();
}

async function sendMessage(){
  const text = userInput.value.trim();

  if(text === ""){
    return;
  }

  addMessage(text, "user-message");
  userInput.value = "";

  const loadingBubble = addMessage("Thinking calmly... 🌿", "bot-message loading-message");

  try{
    const response = await fetch(API_URL, {
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        message:text,
        sessionId:sessionId
      })
    });

    const data = await response.json();

    loadingBubble.remove();

    if(data.reply){
      addMessage(data.reply, "bot-message");
    }else{
      addMessage("I could not get a reply. Please try again.", "bot-message");
    }

  }catch(error){
    loadingBubble.remove();
    addMessage("Sorry, I couldn't connect right now. Please try again later.", "bot-message");
  }
}

userInput.addEventListener("keypress", function(event){
  if(event.key === "Enter"){
    sendMessage();
  }
});

window.addEventListener("load", function(){
  userInput.focus();
});