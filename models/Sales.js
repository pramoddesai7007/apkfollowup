const mongoose = require('mongoose');

const salesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  shiftHours: {
    type: String,
    required: true,
  },
  adminUserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee', // Reference to the admin user in the "Employee" collection
  },
  adminCompanyName: {
    type: String,
    required: true,
  },

});

const Sales = mongoose.model('Sales', salesSchema);

module.exports = Sales;

