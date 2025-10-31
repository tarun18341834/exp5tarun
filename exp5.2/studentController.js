const Student = require('../models/Student');

// CREATE ➤ Add new student
exports.createStudent = async (req, res) => {
  try {
    const { name, age, course } = req.body;
    const student = new Student({ name, age, course });
    await student.save();
    res.status(201).json({ message: '✅ Student added successfully', student });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// READ ➤ Get all students
exports.getAllStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// READ ➤ Get student by ID
exports.getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ message: 'Student not found' });
    res.json(student);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// UPDATE ➤ Update student by ID
exports.updateStudent = async (req, res) => {
  try {
    const { name, age, course } = req.body;
    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      { name, age, course },
      { new: true, runValidators: true }
    );
    if (!updatedStudent)
      return res.status(404).json({ message: 'Student not found' });
    res.json({ message: '✅ Student updated', updatedStudent });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// DELETE ➤ Delete student by ID
exports.deleteStudent = async (req, res) => {
  try {
    const deletedStudent = await Student.findByIdAndDelete(req.params.id);
    if (!deletedStudent)
      return res.status(404).json({ message: 'Student not found' });
    res.json({ message: '🗑️ Student deleted', deletedStudent });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
