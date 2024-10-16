const { Router } = require('express')
const express = require('express')
const router = express.Router()
const { body, validationResult } = require('express-validator');
const Company = require('../models/Company');
const Employee = require('../models/Employee');
const SubEmployee = require('../models/SubEmployee');
const Task = require('../models/Task');
const Record = require('../models/Record');
const jwtMiddleware = require('../jwtmiddleware');




router.post('/clockIn', async (req, res) => {
    const { employeeId } = req.body;
  
    if (!employeeId) {
      return res.status(400).json({ message: 'Employee ID is required' });
    }
  
    const currentTime = new Date();
  
    let record = await Record.findOne({ employeeId });
  
    if (!record) {
      record = new Record({ employeeId, clockIns: [], clockOuts: [] });
    }
  
    record.clockIns.push(currentTime);
    await record.save();
  
    res.json({ message: 'Clocked in', time: currentTime });
  });
  




  router.post('/clockout', async (req, res) => {
    const { employeeId } = req.body;
  
    if (!employeeId) {
      return res.status(400).json({ message: 'Employee ID is required' });
    }
  
    const employee = await Employee.findOne({ employeeId });
  
    if (!employee) {
      return res.status(400).json({ message: 'No clock-in record found for this employee' });
    }
  
    const currentTime = new Date();
  
    employee.clockOuts.push(currentTime);
    await employee.save();
  
    res.json({ message: 'Clocked out', time: currentTime });
  });
  



  router.get('/employee/:employeeId', async (req, res) => {
    const { employeeId } = req.params;
  
    const employee = await Employee.findOne({ employeeId });
  
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
  
    const { clockIns, clockOuts } = employee;
    let totalHours = 0;
  
    for (let i = 0; i < Math.min(clockIns.length, clockOuts.length); i++) {
      const clockInTime = new Date(clockIns[i]);
      const clockOutTime = new Date(clockOuts[i]);
  
      totalHours += (clockOutTime - clockInTime) / (1000 * 60 * 60); // Convert milliseconds to hours
    }
  
    const employeeData = {
      employeeId,
      clockIns,
      clockOuts,
      totalHours: totalHours.toFixed(2) // Round to 2 decimal places
    };
  
    res.json(employeeData);
  });
  


module.exports = router
