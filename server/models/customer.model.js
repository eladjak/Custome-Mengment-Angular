const mongoose = require('mongoose');

// Customer Schema Definition
const customerSchema = new mongoose.Schema({
    // Unique identifier for the customer
    id: {
        type: String,
        required: true,
        unique: true
    },
    // Customer's full name
    name: {
        type: String,
        required: true,
        trim: true
    },
    // Customer's service area/region
    area: {
        type: String,
        required: true,
        trim: true
    },
    // Customer's phone number
    phone: {
        type: String,
        required: true,
        trim: true
    },
    // Customer's email address
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email address']
    }
}, {
    timestamps: true, // Adds createdAt and updatedAt timestamps
    collection: 'customers' // Explicitly set collection name
});

// Add logging middleware
customerSchema.pre('save', function(next) {
    console.log(`Saving customer: ${this.name}`);
    next();
});

customerSchema.pre('remove', function(next) {
    console.log(`Removing customer: ${this.name}`);
    next();
});

// Create the model
const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer; 