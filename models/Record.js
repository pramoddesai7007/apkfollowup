const mongoose = require('mongoose');

const RecordSchema = new mongoose.Schema({
  employeeId: {
    type: String,
    required: true,
    unique: true
  },
  clockIns: {
    type: [Date],
    default: []
  },
  clockOuts: {
    type: [Date],
    default: []
  }
});

const Record = mongoose.model('Record', RecordSchema);

module.exports = Record;