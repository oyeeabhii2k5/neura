// Slide navigation switching
function showSlide(slideId) {
  document.querySelectorAll(".slide").forEach(slide => {
    slide.classList.remove("active");
  });
  document.getElementById(slideId).classList.add("active");

  // Optional: scroll to top when changing slides
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// Services section toggle logic
function toggleService(clickedItem) {
  const allItems = document.querySelectorAll('.service-item');
  allItems.forEach(item => {
    if (item !== clickedItem) {
      item.classList.remove('active');
    }
  });
  clickedItem.classList.toggle('active');
}

// Portfolio project overlay toggle
function toggleProjectDescription(projectElement) {
  const desc = projectElement.querySelector('.project-description');
  desc.style.opacity = desc.style.opacity === "1" ? "0" : "1";
}

// Skill animation (circular bars)
function animateSkills() {
  const skillCircles = document.querySelectorAll('.circle');
  skillCircles.forEach(circle => {
    const percent = circle.getAttribute('data-percent');
    circle.style.setProperty('--percent', `${percent}%`);
  });
}

// Trigger skill animation only once when in view
let skillsAnimated = false;
function handleScroll() {
  const skillSection = document.getElementById("skills");
  const rect = skillSection.getBoundingClientRect();
  if (rect.top < window.innerHeight - 100 && !skillsAnimated) {
    animateSkills();
    skillsAnimated = true;
  }
}

// Scroll listener
window.addEventListener("scroll", handleScroll);

document.addEventListener("DOMContentLoaded", function () {
    const activityInput = document.getElementById("activity-input");
    const startTimeInput = document.getElementById("start-time");
    const endTimeInput = document.getElementById("end-time");
    const addActivityBtn = document.getElementById("add-activity-btn");
    const routineList = document.getElementById("routine-list");

    // Load saved routine activities from localStorage
    loadRoutine();

    // Add activity
    addActivityBtn.addEventListener("click", function () {
        const activityText = activityInput.value.trim();
        const startTime = startTimeInput.value.trim();
        const endTime = endTimeInput.value.trim();

        if (activityText && startTime && endTime) {
            const activity = {
                id: Date.now(),
                text: activityText,
                startTime: startTime,
                endTime: endTime,
            };
            addActivityToUI(activity);
            saveActivityToLocalStorage(activity);
            activityInput.value = "";
            startTimeInput.value = "";
            endTimeInput.value = "";
        }
    });

    // Delete activity
    routineList.addEventListener("click", function (e) {
        if (e.target && e.target.tagName === "BUTTON") {
            const activityId = e.target.parentElement.getAttribute("data-id");
            deleteActivityFromUI(activityId);
            deleteActivityFromLocalStorage(activityId);
        }
    });

    // Function to add activity to UI
    function addActivityToUI(activity) {
        const activityItem = document.createElement("li");
        activityItem.setAttribute("data-id", activity.id);
        activityItem.innerHTML = `
            <div class="activity-text">${activity.text}</div>
            <div class="activity-time">${activity.startTime} - ${activity.endTime}</div>
            <button>Delete</button>
        `;
        routineList.appendChild(activityItem);
    }

    // Function to load saved activities from localStorage
    function loadRoutine() {
        const activities = JSON.parse(localStorage.getItem("routine")) || [];
        activities.forEach((activity) => addActivityToUI(activity));
    }

    // Function to save activity to localStorage
    function saveActivityToLocalStorage(activity) {
        const activities = JSON.parse(localStorage.getItem("routine")) || [];
        activities.push(activity);
        localStorage.setItem("routine", JSON.stringify(activities));
    }

    // Function to delete activity from UI
    function deleteActivityFromUI(activityId) {
        const activityItem = document.querySelector(`[data-id="${activityId}"]`);
        if (activityItem) {
            activityItem.remove();
        }
    }

    // Function to delete activity from localStorage
    function deleteActivityFromLocalStorage(activityId) {
        const activities = JSON.parse(localStorage.getItem("routine")) || [];
        const updatedActivities = activities.filter((activity) => activity.id != activityId);
        localStorage.setItem("routine", JSON.stringify(updatedActivities));
    }
});

// script.js

document.getElementById("send-btn").addEventListener("click", function() {
  var userMessage = document.getElementById("user-input").value.trim();
  if (userMessage) {
    // Display user message
    var userMessageElement = document.createElement("div");
    userMessageElement.classList.add("message", "user-message");
    userMessageElement.innerHTML = "<p>" + userMessage + "</p>";
    document.querySelector(".messages").appendChild(userMessageElement);

    // Add a simulated response from NEURA
    var neuraMessageElement = document.createElement("div");
    neuraMessageElement.classList.add("message", "neura-message");
    neuraMessageElement.innerHTML = "<p>I'm processing your request...</p>";
    document.querySelector(".messages").appendChild(neuraMessageElement);

    // Scroll to the bottom
    var chatBox = document.querySelector(".chat-box");
    chatBox.scrollTop = chatBox.scrollHeight;

    // Clear input
    document.getElementById("user-input").value = "";
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const moods = document.querySelectorAll(".mood");
  const submitBtn = document.querySelector(".submit-mood");
  const todayMoodText = document.getElementById("todayMood");
  let selectedMood = "";

  if (moods.length && submitBtn && todayMoodText) {
    moods.forEach(m => {
      m.addEventListener("click", () => {
        moods.forEach(el => el.classList.remove("selected"));
        m.classList.add("selected");
        selectedMood = m.dataset.mood;
      });
    });

    submitBtn.addEventListener("click", () => {
      if (selectedMood !== "") {
        todayMoodText.textContent = selectedMood;
      } else {
        alert("Please select your mood before submitting.");
      }
    });
  } else {
    console.warn("Mood Tracker elements not found.");
  }
});

// Load saved tasks on page load
document.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {
  const input = document.getElementById("taskInput");
  const taskText = input.value.trim();

  if (taskText === "") return;

  const taskItem = createTaskElement(taskText);
  document.getElementById("taskList").appendChild(taskItem);

  saveTask(taskText);
  input.value = "";
}

function createTaskElement(text, completed = false) {
  const li = document.createElement("li");
  if (completed) li.classList.add("completed");

  li.textContent = text;

  const actions = document.createElement("div");

  const completeBtn = document.createElement("button");
  completeBtn.textContent = "✔";
  completeBtn.onclick = () => {
    li.classList.toggle("completed");
    updateStorage();
  };

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "🗑";
  deleteBtn.onclick = () => {
    li.remove();
    updateStorage();
  };

  actions.appendChild(completeBtn);
  actions.appendChild(deleteBtn);
  li.appendChild(actions);

  return li;
}

function saveTask(text) {
  const tasks = getTasks();
  tasks.push({ text, completed: false });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const tasks = getTasks();
  tasks.forEach(task => {
    const taskItem = createTaskElement(task.text, task.completed);
    document.getElementById("taskList").appendChild(taskItem);
  });
}

function updateStorage() {
  const taskElements = document.querySelectorAll("#taskList li");
  const tasks = [];

  taskElements.forEach(li => {
    tasks.push({
      text: li.firstChild.textContent.trim(),
      completed: li.classList.contains("completed")
    });
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function getTasks() {
  return JSON.parse(localStorage.getItem("tasks")) || [];
}

document.addEventListener("DOMContentLoaded", loadNotes);

function addNote() {
  const noteText = document.getElementById("noteText").value.trim();
  if (noteText === "") return;

  const note = createNoteElement(noteText);
  document.getElementById("notesContainer").appendChild(note);

  saveNote(noteText);
  document.getElementById("noteText").value = "";
}

function createNoteElement(text) {
  const div = document.createElement("div");
  div.classList.add("note-card");

  const p = document.createElement("p");
  p.textContent = text;

  const delBtn = document.createElement("button");
  delBtn.textContent = "🗑";
  delBtn.onclick = () => {
    div.remove();
    updateStorage();
  };

  div.appendChild(p);
  div.appendChild(delBtn);

  return div;
}

function saveNote(text) {
  const notes = getNotes();
  notes.push(text);
  localStorage.setItem("notes", JSON.stringify(notes));
}

function loadNotes() {
  const notes = getNotes();
  notes.forEach(text => {
    const note = createNoteElement(text);
    document.getElementById("notesContainer").appendChild(note);
  });
}

function updateStorage() {
  const noteCards = document.querySelectorAll(".note-card p");
  const notes = [];
  noteCards.forEach(p => notes.push(p.textContent));
  localStorage.setItem("notes", JSON.stringify(notes));
}

function getNotes() {
  return JSON.parse(localStorage.getItem("notes")) || [];
}

document.addEventListener("DOMContentLoaded", () => {
  const quotes = [
    "Stay focused and never give up on your dreams.",
    "Success is the sum of small efforts repeated daily.",
    "Don't watch the clock. Do what it does. Keep going.",
    "Discipline is doing what needs to be done, even if you don't want to.",
    "Push yourself, because no one else is going to do it for you.",
    "Every accomplishment starts with the decision to try.",
    "Focus on being productive, not busy.",
    "Your only limit is your mind.",
    "You are capable of amazing things.",
    "Progress, not perfection."
  ];

  const quoteElement = document.getElementById("quoteText");
  const button = document.querySelector("button");

  button.addEventListener("click", () => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    quoteElement.textContent = quotes[randomIndex];
  });
});