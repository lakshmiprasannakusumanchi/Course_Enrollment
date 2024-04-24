const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://student_user:oCEQTkO20V0DGTN3@cluster0.gfrftal.mongodb.net/crud_data', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});
mongoose.connection.once('open', () => {
  console.log('Connected to the database!');
}).on('error', err => {
  console.error('Error with the database:', err);
});
