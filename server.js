const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect('mongodb://127.0.0.1:27017/scheduleDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Schedule Schema and Model
const scheduleSchema = new mongoose.Schema({
  email: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  interestedIn: { type: String, required: true },
});

const Schedule = mongoose.model('Schedule', scheduleSchema);

// API Routes
app.post('/api/schedule', async (req, res) => {
  try {
    const { email, firstName, lastName, interestedIn } = req.body;

    // Save the data
    const schedule = new Schedule({
      email,
      firstName,
      lastName,
      interestedIn,
    });

    await schedule.save();
    res.status(201).json({ message: 'Schedule submitted successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while saving the schedule' });
  }
});

app.get('/api/schedules', async (req, res) => {
  try {
    const schedules = await Schedule.find();
    res.json(schedules);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching schedules' });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
