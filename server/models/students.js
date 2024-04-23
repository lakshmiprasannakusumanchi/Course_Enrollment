const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 33,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true
  },
  course: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 33,
    trim: true
  }
});

module.exports = mongoose.model('students', studentSchema);



