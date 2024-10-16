const mongoose = require('mongoose');
const { Schema } = mongoose;

const ClockRecordSchema = new Schema({
  clockIn:
  {
    type: Date,
    required: true
  },
  clockInCoordinates: {
    latitude:
    {
      type: Number,
      // required: true
    },
    longitude: {
      type: Number,
      // required: true
    }
  },
  clockOut:
    { type: Date },
  clockOutCoordinates: {
    latitude:
      { type: Number },
    longitude:
      { type: Number }
  },
  
  workDuration: { type: Number } // Duration in hours
});


const SalarySchema = new Schema({
  name: { type: String, required: true},
  email: { type: String, required: true, unique: true },
  companyName: { type: String},
  clockRecords: [ClockRecordSchema],
  hourlyRate: { type: Number, required: true }
});

const Salary = mongoose.model('Salary', SalarySchema);

module.exports = Salary;
