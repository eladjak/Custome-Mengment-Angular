const express = require('express');
const router = express.Router();
const Task = require('../models/task.model');
const config = require('../config/config');

// Get all tasks
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    config.logger.error('Error fetching tasks:', error);
    res.status(500).json({ message: error.message });
  }
});

// Get task by ID
router.get('/:id', async (req, res) => {
  try {
    const task = await Task.findOne({ taskId: req.params.id });
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json(task);
  } catch (error) {
    config.logger.error('Error fetching task:', error);
    res.status(500).json({ message: error.message });
  }
});

// Get tasks by customer ID
router.get('/customer/:customerId', async (req, res) => {
  try {
    const tasks = await Task.find({ customerId: req.params.customerId });
    res.json(tasks);
  } catch (error) {
    config.logger.error('Error fetching customer tasks:', error);
    res.status(500).json({ message: error.message });
  }
});

// Create task
router.post('/', async (req, res) => {
  const task = new Task(req.body);
  try {
    const newTask = await task.save();
    res.status(201).json(newTask);
  } catch (error) {
    config.logger.error('Error creating task:', error);
    res.status(400).json({ message: error.message });
  }
});

// Update task
router.put('/:id', async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate(
      { taskId: req.params.id },
      req.body,
      { new: true }
    );
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json(task);
  } catch (error) {
    config.logger.error('Error updating task:', error);
    res.status(400).json({ message: error.message });
  }
});

// Delete task
router.delete('/:id', async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({ taskId: req.params.id });
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    config.logger.error('Error deleting task:', error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router; 