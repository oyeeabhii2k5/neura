function startCountdown() {
  const eventDateInput = document.getElementById('eventDate').value;
  if (!eventDateInput) {
    alert('Please select a valid date and time!');
    return;
  }

  const eventDate = new Date(eventDateInput).getTime();
  const countdownDisplay = document.getElementById('countdownDisplay');
  
  const countdownInterval = setInterval(function() {
    const now = new Date().getTime();
    const distance = eventDate - now;

    if (distance < 0) {
      clearInterval(countdownInterval);
      countdownDisplay.innerHTML = 'Event has started!';
    } else {
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      countdownDisplay.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
    }
  }, 1000);
}