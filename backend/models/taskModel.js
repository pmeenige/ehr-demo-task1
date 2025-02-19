const mongoose = require('mongoose');

// Define Task Schema
const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      maxlength: 50
    },
    description: {
      type: String,
      maxlength: 100
    },
    assignedTo: {
      type: String,
      required: true
    },
    dueDate: {
      type: Date,
      required: true
    },
    priority: {
      type: String,
      required: true,
      enum: ['low', 'medium', 'high'],
      lowercase:true,
    },
    status: {
      type: String,
      required: true,
      enum: ['pending', 'in-progress', 'completed'],
      lowercase:true,
      
    },
    isRead: {
      type: Boolean,
      default: false
    },
    isDeleted:{
      type:Boolean,
      default:false
    }
  },
);

// Create and export Task model
const Task = mongoose.model('PTask', taskSchema);

module.exports = Task;
