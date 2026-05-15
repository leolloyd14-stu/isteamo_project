function updatePlant(mood){
  const plant = document.getElementById("plant");
  const message = document.getElementById("plantMessage");

  plant.className = "plant";

  if(mood === "veryCalm"){
    plant.textContent = "🌷";
    plant.classList.add("happy");
    message.textContent = "Amazing! Your plant blooms because your mind feels calm.";
  }
  else if(mood === "okay"){
    plant.textContent = "🌿";
    plant.classList.add("happy");
    message.textContent = "Nice! Your plant grows new leaves as you stay balanced.";
  }
  else if(mood === "littleStressed"){
    plant.textContent = "🪴";
    plant.classList.add("neutral");
    message.textContent = "Your plant is steady. Try a breathing exercise to feel better.";
  }
  else if(mood === "stressed"){
    plant.textContent = "🥀";
    plant.classList.add("sad");
    message.textContent = "Your plant looks tired. Try calming sounds or write in your journal.";
  }
  else if(mood === "veryStressed"){
    plant.textContent = "🍂";
    plant.classList.add("sad");
    message.textContent = "Your plant needs care. Pause, breathe slowly, and be kind to yourself.";
  }

  localStorage.setItem("calmGardenLatestMood", mood);
}

function saveJournal(){
  const journal = document.getElementById("journal").value;
  const message = document.getElementById("journalMessage");

  if(journal.trim() === ""){
    message.textContent = "Please write something before saving.";
  }
  else{
    localStorage.setItem("calmGardenJournal", journal);
    message.textContent = "Your journal entry has been saved 🌿";
  }
}

window.addEventListener("load", function(){
  const savedJournal = localStorage.getItem("calmGardenJournal");
  const journal = document.getElementById("journal");

  if(savedJournal && journal){
    journal.value = savedJournal;
  }
});