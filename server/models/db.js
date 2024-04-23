const mongoose = require('mongoose');

// Allow Promises
mongoose.Promise = global.Promise;

// MongoDB Connection
mongoose.connect('mongodb://0.0.0.0:27017/db_test', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Connection Event Handlers
mongoose.connection.once('open', () => {
  console.log('Connected to the database!');
}).on('error', err => {
  console.error('Error with the database:', err);
});
