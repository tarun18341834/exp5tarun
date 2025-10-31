const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

// CRUD Routes
router.post('/', studentController.createStudent);        // Create
router.get('/', studentController.getAllStudents);        // Read all
router.get('/:id', studentController.getStudentById);     // Read by ID
router.put('/:id', studentController.updateStudent);      // Update
router.delete('/:id', studentController.deleteStudent);   // Delete

module.exports = router;
