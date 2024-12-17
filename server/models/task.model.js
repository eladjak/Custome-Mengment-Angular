const mongoose = require("mongoose");

// Task Schema Definition
const taskSchema = new mongoose.Schema(
  {
    // Task identifier
    taskId: {
      type: String,
      required: true,
      unique: true,
    },
    // Task title
    title: {
      type: String,
      required: true,
      trim: true,
    },
    // Reference to the customer
    customerId: {
      type: String,
      required: true,
      ref: "Customer",
    },
    // Task description
    description: {
      type: String,
      required: true,
      trim: true,
    },
    // Due date for the task
    dueDate: {
      type: Date,
      required: true,
    },
    // Task status (e.g., pending, completed)
    status: {
      type: String,
      enum: ["pending", "in-progress", "completed", "cancelled"],
      default: "pending",
    },
    // Task priority
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },
    // Completion status
    isCompleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt timestamps
    collection: "tasks", // Explicitly set collection name
  }
);

// Add logging middleware
taskSchema.pre("save", function (next) {
  console.log(
    `Saving task for customer: ${this.customerId}, Title: ${this.title}, Description: ${this.description}`
  );
  next();
});

taskSchema.pre("remove", function (next) {
  console.log(`Removing task: ${this.taskId}`);
  next();
});

// Create the model
const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
