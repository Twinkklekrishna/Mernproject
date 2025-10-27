const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
    unique: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email',
    ],
  },
  position: {
    type: String,
    required: [true, 'Please add a position'],
  },
  department: {
    type: String,
    required: [true, 'Please add a department'],
  },
  performanceScore: {
    type: Number,
    required: [true, 'Please add a performance score'],
    min: 0,
    max: 100,
  },
  tasksCompleted: {
    type: Number,
    required: [true, 'Please add the number of tasks completed'],
    min: 0,
  },
}, {
  timestamps: true, // Adds createdAt and updatedAt fields
});

// Use a virtual to transform the output to match the frontend's expectation
employeeSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id; // remove _id
    ret.lastUpdated = ret.updatedAt; // rename updatedAt to lastUpdated
    delete ret.updatedAt;
    delete ret.createdAt;
  }
});

module.exports = mongoose.model('Employee', employeeSchema);
