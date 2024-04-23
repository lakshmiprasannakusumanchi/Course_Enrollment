const express = require('express');
const router = express.Router();
const Course = require('../models/courses');

// GET all courses
router.get('/', async (req, res) => {
    try {
        const courses = await Course.find({});
        res.send({ courses });
    } catch (err) {
        console.error(err);
        res.status(500).send({ error: 'Server Error' });
    }
});

// GET a specific course by name
router.get('/:name', async (req, res) => {
    try {
        const course = await Course.findOne({ name: req.params.name });
        if (!course) {
            return res.status(404).send({ error: 'Course not found' });
        }
        res.send({ course });
    } catch (err) {
        console.error(err);
        res.status(500).send({ error: 'Server Error' });
    }
});

// POST create a course
router.post('/', async (req, res) => {
    try {
        const newCourse = await Course.create(req.body);
        res.status(201).send({ newCourse });
    } catch (err) {
        console.error(err);
        res.status(400).send({ error: err.message });
    }
});

// PUT update a course
router.put('/:id', async (req, res) => {
    try {
        const updatedCourse = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.send({ updatedCourse });
    } catch (err) {
        console.error(err);
        res.status(400).send({ error: err.message });
    }
});

// DELETE a course
router.delete('/:id', async (req, res) => {
    try {
        await Course.findByIdAndDelete(req.params.id);
        res.send({ message: 'Course deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(400).send({ error: err.message });
    }
});

module.exports = router;
