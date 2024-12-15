const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const config = require('./config/config');
const customerRoutes = require('./routes/customer.routes');
const taskRoutes = require('./routes/task.routes');
const seedData = require('./seeds/demo-data');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/customers', customerRoutes);
app.use('/api/tasks', taskRoutes);

// Connect to MongoDB
mongoose.connect(config.mongoURI)
  .then(async () => {
    console.log('Connected to MongoDB');
    
    // Seed data if needed
    if (process.env.NODE_ENV !== 'production') {
      try {
        await seedData();
        console.log('Demo data seeded successfully');
      } catch (error) {
        console.error('Error seeding demo data:', error);
      }
    }
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Start server
const PORT = process.env.PORT || 3030;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 