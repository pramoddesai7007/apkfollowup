const mongoose = require('mongoose');
const moment = require('moment');


const remarkSchema = new mongoose.Schema({
  remark: {
    type: String,
    // required: true
  },
  isRead:{
    type:Boolean,
    default:false
  },
  assignedBy: {
    type: String
  },
  assignedByEmp: {
    type: String
  },
  timestamp: {
    type: Date,
    // required: true,
    default: Date.now
  }
});

// Define the schema for tasks
const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  assignTo: [{
    type: mongoose.Schema.Types.ObjectId, // Assuming assignTo is a reference to Employee
    ref: 'Employee', // Reference to the Employee model
    // required: true,
  }],
  startDate: {
    type: Date, // Date for task start
    required: true,
  },
  deadlineDate: {
    type: Date, // Date for task deadline
    required: true,
  },
  reminderDate: {
    type: Date, // Date for task reminder
    // required: true,
  },
  startTime: {
    type: String, // Time for task start
    required: true,
  },
  endTime: {
    type: String, // Time for task end
    required: true,
  },
  reminderTime: {
    type: String, // Time for task end
    // required: true,
  },
  // picture: {
  //   type: String, // File path or URL to the picture (if applicable)
  // },
  pictures: { type: [String], default: [] }, // Array of picture paths

  audio: {
    type: String, // File path or URL to the audio (if applicable)
  },
  imagePath: {
    type: String, // File path or URL to the audio (if applicable)
  },
  phoneNumber: {
    type: String,
  },
  isRead: {
    type: Boolean,
    default: false
  },
  status: {
    type: String, // Status of the task (e.g., 'pending', 'completed')
    required: true,
    default: 'pending',
  },
  assignedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee',
    // required: true
  },
  assignedByEmp: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SubEmployee',
    // required: true
  },
  remarkToList: {
    type: [remarkSchema],
    default: [],
  },
  empRemarkToList: {
    type: [remarkSchema],
    default: [],
  },
});

// taskSchema.pre('save', function (next) {
//   if (this.endTime) {
//     const endTime24hr = moment(this.endTime, ['h:mm A']).format('HH:mm');
//     const period = moment(this.endTime, ['h:mm A']).format('A');
//     this.endTime = `${endTime24hr} ${period}`;
//   }
//   next();
// });


taskSchema.pre('save', function (next) {
  if (this.endTime) {
    this.endTime = moment(this.endTime, ['h:mm A', 'hh:mm A']).format('hh:mm A');
  }
  next();
});

// Create the Task model
const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
