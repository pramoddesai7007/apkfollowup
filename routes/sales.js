require('dotenv').config();

const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Sales = require('../models/Sales');
const jwtMiddleware = require('../jwtmiddleware');
const Employee = require('../models/Employee');
const fs = require('fs');
const combinedMiddleware = require('./../combinedMiddleware');

// const SUBEMPLOYEE_JWT_SECRET = "YourSubEmployeeSecretKey"
const SALES_JWT_SECRET = process.env.SALES_JWT_SECRET

router.post('/login',combinedMiddleware, async (req, res) => {
  const { email, password } = req.body;
  const subscriptionData = JSON.parse(fs.readFileSync('subscription.json', 'utf8'));
        const registrationData = JSON.parse(fs.readFileSync('registration.json', 'utf8'));

  try {
    // Find the sub-employee by email
    const sales = await Sales.findOne({ email });

    if (!sales) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Verify the password
    const isPasswordValid = await bcrypt.compare(password, sales.password);

    console.log(isPasswordValid)
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Create a JWT token with the sub-employee's information
    const token = jwt.sign(
      { salesId: sales._id, email: sales.email, role: 'sales', adminCompanyName: sales.adminCompanyName, name: sales.name },
      SALES_JWT_SECRET,
    );
    console.log(token)
    return res.status(200).json({ message: 'Authentication successful', token,
    subscriptionStatus: subscriptionData.status,
    registrationStatus: registrationData.status});
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});




module.exports = router;