function showNewPrompt() {
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
  const randomIndex = Math.floor(Math.random() * quotes.length);
  quoteElement.textContent = quotes[randomIndex];
}