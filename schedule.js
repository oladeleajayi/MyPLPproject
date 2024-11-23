document.getElementById('frm-schedule').addEventListener('submit', async (event) => {
  event.preventDefault();

  const email = document.getElementById('email').value;
  const firstName = document.getElementById('first name').value;
  const lastName = document.getElementById('Last name').value;
  const interestedIn = document.getElementById('Interested in').value;

  try {
    const response = await fetch('http://localhost:5000/api/schedule', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, firstName, lastName, interestedIn }),
    });

    if (response.ok) {
      alert('Schedule submitted successfully!');
    } else {
      alert('Failed to submit the schedule');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('An error occurred while submitting the schedule');
  }
});
