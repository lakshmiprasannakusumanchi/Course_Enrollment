const mongoose = require('mongoose');

// Allow Promises
mongoose.Promise = global.Promise;

// MongoDB Connection
mongoose.connect('mongodb+srv://student_user:oCEQTkO20V0DGTN3@cluster0.gfrftal.mongodb.net/crud_data', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

// Connection Event Handlers
mongoose.connection.once('open', () => {
  console.log('Connected to the database!');
}).on('error', err => {
  console.error('Error with the database:', err);
});
