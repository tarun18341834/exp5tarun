const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Student name is required']
  },
  age: {
    type: Number,
    required: [true, 'Age is required'],
    min: [5, 'Age must be at least 5']
  },
  course: {
    type: String,
    required: [true, 'Course is required']
  }
});

module.exports = mongoose.model('Student', studentSchema);
