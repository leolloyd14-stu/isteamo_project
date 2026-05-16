function showMoodMessage(mood) {
  const messageBox = document.getElementById("moodMessage");

  if (mood === "calm") {
    messageBox.textContent = "Great! Your mind feels peaceful today 🌿";
  } 
  else if (mood === "okay") {
    messageBox.textContent = "You're doing okay. Keep taking small calm steps 🌱";
  } 
  else if (mood === "stressed") {
    messageBox.textContent = "Take a deep breath. Try a short calming activity 💚";
  }
}
